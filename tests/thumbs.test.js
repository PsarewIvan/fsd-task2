import Thumbs from '../src/components/view/Thumbs';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Global testing', () => {
  const state = {
    type: 'single',
    orientation: 'horizontal',
    min: 0,
    max: 400,
    hints: true,
  };

  it('Calls update without hints', () => {
    const thumbs = new Thumbs(document.body, { hints: false });
    thumbs.updatePosition = jest.fn();
    thumbs.updateHints = jest.fn();
    thumbs.update(0.2, 20);
    expect(thumbs.updatePosition).toHaveBeenCalled();
    expect(thumbs.updateHints).not.toHaveBeenCalled();
  });

  it('Calls update with hints', () => {
    const thumbs = new Thumbs(document.body, { hints: true });
    thumbs.updatePosition = jest.fn();
    thumbs.updateHints = jest.fn();
    thumbs.update(0.2, 20);
    expect(thumbs.updatePosition).toHaveBeenCalled();
    expect(thumbs.updateHints).toHaveBeenCalled();
  });

  it('Mouse listener must be set root.ondragstart to false', () => {
    const thumbs = new Thumbs(document.body, state);
    thumbs.mouseListener(thumbs.thumbs[0].root);
    expect(thumbs.thumbs[0].root.ondragstart()).toBe(false);
  });
});

describe('Testing single thumb', () => {
  const state = {
    type: 'single',
    orientation: 'horizontal',
    min: 0,
    max: 400,
    hints: true,
  };

  it('Render thumb', () => {
    const thumbs = new Thumbs(document.body, state);
    expect(thumbs.thumbs[0].root).toBeInTheDocument();
  });

  it('The number of thumbs must be one', () => {
    const thumbs = new Thumbs(document.body, state);
    expect(thumbs.thumbs.length).toBe(1);
  });

  it('Updated position on horizontal thumb', () => {
    const thumbs = new Thumbs(document.body, state);
    thumbs.updatePosition([0.1]);
    expect(thumbs.thumbs[0].root.style.left).toBe('10%');
  });

  it('Updated position on vertical thumb', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    thumbs.updatePosition([0.1]);
    expect(thumbs.thumbs[0].root.style.top).toBe('10%');
  });

  it('Getting thumb width', () => {
    const thumbs = new Thumbs(document.body, state);
    Object.defineProperty(thumbs.thumbs[0].root, 'offsetWidth', { value: 35 });
    expect(thumbs.getThumbSize()).toBe(35);
  });

  it('Adds listeners', () => {
    const thumbs = new Thumbs(document.body, state);
    thumbs.mouseListener = jest.fn();
    thumbs.addMouseListener(jest.fn(), jest.fn());
    expect(thumbs.mouseListener).toHaveBeenCalledTimes(1);
  });

  it('Called pointerdown function', () => {
    const thumbs = new Thumbs(document.body, state);
    thumbs.mouseMoveEvent = jest.fn();
    thumbs.thumbs.forEach((thumb) => {
      thumbs.mouseListener(thumb.root);
      userEvent.click(thumb.root);
    });
    expect(thumbs.mouseMoveEvent).toHaveBeenCalledTimes(1);
  });

  it('Updatesd thumb shift', () => {
    const thumbs = new Thumbs(document.body, state);
    const evt = {
      clientX: 500,
    };
    let returnValues;
    const mockHandler = jest.fn((thumbShift, index) => {
      returnValues = { thumbShift, index };
    });
    thumbs.updateThumbsShift(evt, thumbs.thumbs[0].root, 15, mockHandler);
    expect(returnValues).toEqual({ thumbShift: 485, index: 0 });
  });

  it('Updatesd thumb shift on vertical', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    const evt = {
      clientY: 120,
    };
    let returnValues;
    const mockHandler = jest.fn((thumbShift, index) => {
      returnValues = { thumbShift, index };
    });
    thumbs.updateThumbsShift(evt, thumbs.thumbs[0].root, 50, mockHandler);
    expect(returnValues).toEqual({ thumbShift: 70, index: 0 });
  });

  it('Returns an object with the correct thumb data', () => {
    const thumbs = new Thumbs(document.body, state);
    const returnedObject = thumbs.requiredThumb(100);
    expect(returnedObject).toEqual({
      index: 0,
      root: thumbs.thumbs[0].root,
    });
  });
});

describe('Testing range thumbs', () => {
  const state = {
    type: 'range',
    orientation: 'horizontal',
    min: 500,
    max: 1000,
    hints: true,
  };

  function mockDistance(thumbs) {
    thumbs[0].root.getBoundingClientRect = jest.fn(() => ({
      left: 200,
      top: 300,
    }));
    thumbs[1].root.getBoundingClientRect = jest.fn(() => ({
      left: 450,
      top: 600,
    }));
  }

  it('Render first thumb', () => {
    const thumbs = new Thumbs(document.body, state);
    expect(thumbs.thumbs[0].root).toBeInTheDocument();
  });

  it('Render second thumb', () => {
    const thumbs = new Thumbs(document.body, state);
    expect(thumbs.thumbs[1].root).toBeInTheDocument();
  });

  it('Number of thumbs must be two', () => {
    const thumbs = new Thumbs(document.body, state);
    expect(thumbs.thumbs.length).toBe(2);
  });

  it('Updated position on horizontal thumbs', () => {
    const thumbs = new Thumbs(document.body, state);
    const positions = [];
    thumbs.updatePosition([0.2, 0.6]);
    thumbs.thumbs.forEach((thumb) => {
      positions.push(thumb.root.style.left);
    });
    expect(positions).toEqual(['20%', '60%']);
  });

  it('Updated position on vertical thumbs', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    const positions = [];
    thumbs.updatePosition([0.15, 0.73]);
    thumbs.thumbs.forEach((thumb) => {
      positions.push(thumb.root.style.top);
    });
    expect(positions).toEqual(['15%', '73%']);
  });

  it('Getting thumb height on vertical thumb', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ type: 'range', orientation: 'vertical' },
    });
    Object.defineProperty(thumbs.thumbs[0].root, 'offsetHeight', { value: 15 });
    expect(thumbs.getThumbSize()).toBe(15);
  });

  it('Adds listeners', () => {
    const thumbs = new Thumbs(document.body, state);
    thumbs.mouseListener = jest.fn();
    thumbs.addMouseListener(jest.fn(), jest.fn());
    expect(thumbs.mouseListener).toHaveBeenCalledTimes(2);
  });

  it('Called pointerdown function', () => {
    const thumbs = new Thumbs(document.body, state);
    thumbs.mouseMoveEvent = jest.fn();
    thumbs.thumbs.forEach((thumb) => {
      thumbs.mouseListener(thumb.root);
      userEvent.click(thumb.root);
    });
    expect(thumbs.mouseMoveEvent).toHaveBeenCalledTimes(2);
  });

  it('Updatesd first thumb shift', () => {
    const thumbs = new Thumbs(document.body, state);
    const evt = {
      clientX: 200,
    };
    let returnValues;
    const mockHandler = jest.fn((thumbShift, index) => {
      returnValues = { thumbShift, index };
    });
    thumbs.updateThumbsShift(evt, thumbs.thumbs[0].root, 70, mockHandler);
    expect(returnValues).toEqual({ thumbShift: 130, index: 0 });
  });

  it('Updatesd second thumb shift on vertical', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    const evt = {
      clientY: 600,
    };
    let returnValues;
    const mockHandler = jest.fn((thumbShift, index) => {
      returnValues = { thumbShift, index };
    });
    thumbs.updateThumbsShift(evt, thumbs.thumbs[0].root, 25, mockHandler);
    expect(returnValues).toEqual({ thumbShift: 575, index: 0 });
  });

  it('Returns a first thumb config, when click before first thumb', () => {
    const thumbs = new Thumbs(document.body, state);
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(100);
    expect(returnedObject).toEqual({
      index: 0,
      root: thumbs.thumbs[0].root,
    });
  });

  it('Returns a first thumb config, when the click is before the second thumb but closer to the first', () => {
    const thumbs = new Thumbs(document.body, state);
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(300);
    expect(returnedObject).toEqual({
      index: 0,
      root: thumbs.thumbs[0].root,
    });
  });

  it('Returns a second thumb config, when the click is before the second thumb and closer to the second', () => {
    const thumbs = new Thumbs(document.body, state);
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(400);
    expect(returnedObject).toEqual({
      index: 1,
      root: thumbs.thumbs[1].root,
    });
  });

  it('Returns a second thumb config, when the click is after the second thumb', () => {
    const thumbs = new Thumbs(document.body, state);
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(500);
    expect(returnedObject).toEqual({
      index: 1,
      root: thumbs.thumbs[1].root,
    });
  });

  it('Returns a first thumb config, when click before first thumb on a vertical', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(250);
    expect(returnedObject).toEqual({
      index: 0,
      root: thumbs.thumbs[0].root,
    });
  });

  it('Returns a first thumb config, when the click is before the second thumb but closer to the first on a vertical', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(360);
    expect(returnedObject).toEqual({
      index: 0,
      root: thumbs.thumbs[0].root,
    });
  });

  it('Returns a second thumb config, when the click is before the second thumb and closer to the second on a vertical', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(570);
    expect(returnedObject).toEqual({
      index: 1,
      root: thumbs.thumbs[1].root,
    });
  });

  it('Returns a second thumb config, when the click is after the second thumb', () => {
    const thumbs = new Thumbs(document.body, {
      ...state,
      ...{ orientation: 'vertical' },
    });
    mockDistance(thumbs.thumbs);
    const returnedObject = thumbs.requiredThumb(720);
    expect(returnedObject).toEqual({
      index: 1,
      root: thumbs.thumbs[1].root,
    });
  });
});
