import View from '../src/components/view/View';
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
    expect(view.slider).toBeInTheDocument();
  });

  it('Slider html-element class must be correct', () => {
    const isClassCorrect = view.slider.classList.contains('free-slider');
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

  it('Scale must not be on the document, when "sclae: flase"', () => {
    const localView = new View(document.body, {
      ...state,
      ...{ scale: false },
    });
    expect(localView.scale).toBeUndefined();
  });

  it('Tooltips must be on the document', () => {
    expect(view.tooltips.min.root).toBeInTheDocument();
    expect(view.tooltips.max.root).toBeInTheDocument();
  });

  it('Tooltips must not be on the document, when "tooltips: false"', () => {
    const localView = new View(document.body, {
      ...state,
      ...{ tooltips: false },
    });
    expect(localView.tooltips).toBeUndefined();
  });

  // ----------------
  it('When view updated, thumbs should update with correct parameters', () => {});
});

describe('Testing horizontal slider', () => {
  beforeEach(() => {
    view = new View(document.body, state);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Slider class modificator must be correct', () => {
    const isClassCorrect = view.slider.classList.contains(
      'free-slider--horizontal'
    );
    expect(isClassCorrect).toBeTruthy();
  });
});

describe('Testing vertical slider', () => {
  const state = { ...state, ...{ orientation: 'vertical' } };

  beforeEach(() => {
    view = new View(document.body, state);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Slider class modificator must be correct', () => {
    const isClassCorrect = view.slider.classList.contains(
      'free-slider--vertical'
    );
    expect(isClassCorrect).toBeTruthy();
  });
});

describe('Testing range slider', () => {
  const state = { ...state, ...{ type: 'range' } };

  beforeEach(() => {
    view = new View(document.body, state);
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
