import View from '../src/components/view/View';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

let view;
const state = {
  min: 0,
  max: 500,
  step: 2,
  values: [100],
  type: 'single',
  percents: [20],
  orientation: 'horizontal',
  scale: true,
  scaleMark: 5,
  subScaleMark: 4,
  tooltips: true,
  hints: true,
  onChange: jest.fn((value) => value),
  onFinish: jest.fn((value) => value),
  onUpdate: jest.fn((value) => value),
};

describe('All orientation testing', () => {
  beforeEach(() => {
    view = new View(document.body, state);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Slider parent node must be in the document', () => {
    expect(view.wrapper).toBeInTheDocument();
  });

  it('Slider html-element class must be correct', () => {
    const isClassCorrect = view.wrapper.classList.contains('free-slider');
    expect(isClassCorrect).toBeTruthy();
  });

  it('Track must be in the document', () => {
    expect(view.track.root).toBeInTheDocument();
  });

  it('Bar must be in the document', () => {
    expect(view.bar.root).toBeInTheDocument();
  });

  it('One thumb must be in the document', () => {
    expect(view.thumbs.thumbs[0].root).toBeInTheDocument();
    expect(view.thumbs.thumbs.length).toBe(1);
  });

  it('Scale must be on the document', () => {
    expect(view.scale.root).toBeInTheDocument();
  });

  it('Tooltips must be on the document', () => {
    expect(view.tooltips.min.root).toBeInTheDocument();
    expect(view.tooltips.max.root).toBeInTheDocument();
  });

  // ----------------
  it('When user click to track, handler should be evoke', () => {
    const handler = jest.fn();
    const onFinish = jest.fn();
    view.viewChange(handler, onFinish);
    userEvent.click(view.track.root);
    expect(handler).toHaveBeenCalled();
  });

  // ----------------
  it('When user click to scale, handler should be evoke', () => {
    const handler = jest.fn();
    const onFinish = jest.fn();
    view.viewChange(handler, onFinish);
    userEvent.click(view.scale.root);
    expect(handler).toHaveBeenCalled();
  });

  // ----------------
  it('When user click to thumb, handler should be evoke', () => {
    const handler = jest.fn();
    const onFinish = jest.fn();
    view.viewChange(handler, onFinish);
    userEvent.click(view.scale.root);
    expect(handler).toHaveBeenCalled();
  });

  it('Slider must be hide on document, when user change orientation', () => {
    view.destroyAll();
    expect(view.root.innerHTML).toBe('');
  });
});

describe('Testing horizontal slider', () => {
  beforeEach(() => {
    view = new View(document.body, state);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Slider class modifier must be correct', () => {
    const isClassCorrect = view.wrapper.classList.contains(
      'free-slider--horizontal'
    );
    expect(isClassCorrect).toBeTruthy();
  });

  it('When the thumb shift is 300px, the percent must be calculate to 0.2', () => {
    Object.defineProperty(view.rail.root, 'offsetWidth', { value: 500 });
    view.rail.root.getBoundingClientRect = jest.fn(() => ({
      left: 200,
    }));
    const percent = view.percentFromThumbShift(300);
    expect(percent).toBe(0.2);
  });

  it('When the thumb shift is less then the min value, the percent must be calculate to 0', () => {
    Object.defineProperty(view.rail.root, 'offsetWidth', { value: 500 });
    view.rail.root.getBoundingClientRect = jest.fn(() => ({
      left: 200,
    }));
    const percent = view.percentFromThumbShift(140);
    expect(percent).toBe(0);
  });

  it('When the thumb shift is more then the max value, the percent must be calculate to 1', () => {
    Object.defineProperty(view.rail.root, 'offsetWidth', { value: 500 });
    view.rail.root.getBoundingClientRect = jest.fn(() => ({
      left: 200,
    }));
    const percent = view.percentFromThumbShift(820);
    expect(percent).toBe(1);
  });
});

describe('Testing vertical slider', () => {
  const stateVertical = { ...state, ...{ orientation: 'vertical' } };

  beforeEach(() => {
    view = new View(document.body, stateVertical);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Slider class modifier must be correct', () => {
    const isClassCorrect = view.wrapper.classList.contains(
      'free-slider--vertical'
    );
    expect(isClassCorrect).toBeTruthy();
  });

  it('When the thumb shift is 100px, the percent must be calculate to 0.25', () => {
    Object.defineProperty(view.rail.root, 'offsetHeight', { value: 200 });
    view.rail.root.getBoundingClientRect = jest.fn(() => ({
      top: 50,
    }));
    const percent = view.percentFromThumbShift(100);
    expect(percent).toBe(0.25);
  });

  it('When the thumb shift is less then the min value, the percent must be calculate to 0', () => {
    Object.defineProperty(view.rail.root, 'offsetHeight', { value: 200 });
    view.rail.root.getBoundingClientRect = jest.fn(() => ({
      top: 50,
    }));
    const percent = view.percentFromThumbShift(40);
    expect(percent).toBe(0);
  });

  it('When the thumb shift is more then the max value, the percent must be calculate to 1', () => {
    Object.defineProperty(view.rail.root, 'offsetHeight', { value: 200 });
    view.rail.root.getBoundingClientRect = jest.fn(() => ({
      top: 50,
    }));
    const percent = view.percentFromThumbShift(260);
    expect(percent).toBe(1);
  });
});

describe('Testing range slider', () => {
  const stateRange = { ...state, ...{ type: 'range' } };

  beforeEach(() => {
    view = new View(document.body, stateRange);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Two thumbs must be in the document', () => {
    expect(view.thumbs.thumbs[0].root).toBeInTheDocument();
    expect(view.thumbs.thumbs[1].root).toBeInTheDocument();
    expect(view.thumbs.thumbs.length).toBe(2);
  });
});
