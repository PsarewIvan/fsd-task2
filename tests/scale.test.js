import Scale from '../src/components/view/Scale';
import '@testing-library/jest-dom/extend-expect';

function pointerEvent(node, eventType) {
  // Почему-то PointerEvent не определяется как конструктор
  const event = new MouseEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 500,
    clientY: 300,
  });
  node.dispatchEvent(event);
}
let scale;

describe('Check all orientation', () => {
  const state = {
    max: 500,
    min: 300,
    scale: true,
    scaleMark: 10,
    subScaleMark: 5,
    orientation: 'horizontal',
  };

  beforeEach(() => {
    scale = new Scale(document.body, state);
    scale.update();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Render scale', () => {
    expect(scale.root).toBeInTheDocument();
  });

  it('Scale class must be a "free-slider__scale"', () => {
    expect(scale.root.classList.contains('free-slider__scale')).toBeTruthy();
  });

  it('The total number of mark must be 51', () => {
    const markNumber = scale.root.querySelectorAll('.free-slider__scale-mark')
      .length;
    expect(markNumber).toBe(51);
  });

  it('The total number of big mark must be 11', () => {
    const markNumber = document.querySelectorAll(
      '.free-slider__scale-mark--big'
    ).length;
    expect(markNumber).toBe(11);
  });

  it('The number of text-mark should be to the number of big-mark', () => {
    const textMarks = document.querySelectorAll('.free-slider__scale-text');
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    expect(textMarks.length === bigMarks.length).toBeTruthy();
  });

  it('The text on the first mark must be min value', () => {
    const textMarks = document.querySelectorAll('.free-slider__scale-text');
    expect(textMarks[0].innerHTML).toBe('300');
  });

  it('The text on the last mark must be max value', () => {
    const textMarks = document.querySelectorAll('.free-slider__scale-text');
    expect(textMarks[textMarks.length - 1].innerHTML).toBe('500');
  });

  it('The text on the second mark must be 320', () => {
    const textMarks = document.querySelectorAll('.free-slider__scale-text');
    expect(textMarks[1].innerHTML).toBe('320');
  });
});

describe('Check horizontal', () => {
  const state = {
    max: 250,
    min: 100,
    scale: true,
    scaleMark: 20,
    subScaleMark: 5,
    orientation: 'horizontal',
  };

  beforeEach(() => {
    scale = new Scale(document.body, state);
    scale.update();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('The first mark style left must be 0%', () => {
    const styleLeft = document.querySelectorAll('.free-slider__scale-mark')[0]
      .style.left;
    expect(styleLeft).toBe('0%');
  });

  it('The last mark style left must be 100%', () => {
    const marks = document.querySelectorAll('.free-slider__scale-mark');
    const styleLeft = marks[marks.length - 1].style.left;
    expect(styleLeft).toBe('100%');
  });

  it('The second mark style left must be 1%', () => {
    const marks = document.querySelectorAll('.free-slider__scale-mark');
    const styleLeft = marks[1].style.left;
    expect(styleLeft).toBe('1%');
  });

  it('The first big mark style left must be 0%', () => {
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    const styleLeft = bigMarks[0].style.left;
    expect(styleLeft).toBe('0%');
  });

  it('The last big mark style left must be 100%', () => {
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    const styleLeft = bigMarks[bigMarks.length - 1].style.left;
    expect(styleLeft).toBe('100%');
  });

  it('The second big mark style left must be 5%', () => {
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    const styleLeft = bigMarks[1].style.left;
    expect(styleLeft).toBe('5%');
  });

  it('Click on scale must be call handler with clientX values', () => {
    let values;
    const handler = jest.fn((clientX) => {
      values = clientX;
    });
    scale.clickEvent(handler);
    pointerEvent(scale.root, 'pointerdown');
    expect(values).toBe(500);
  });
});

describe('Check vertical', () => {
  const state = {
    max: 1000,
    min: 800,
    scale: true,
    scaleMark: 5,
    subScaleMark: 4,
    orientation: 'vertical',
  };

  beforeEach(() => {
    scale = new Scale(document.body, state);
    scale.update();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('The first mark style top must be 0%', () => {
    const styleTop = document.querySelectorAll('.free-slider__scale-mark')[0]
      .style.top;
    expect(styleTop).toBe('0%');
  });

  it('The last mark style top must be 100%', () => {
    const marks = document.querySelectorAll('.free-slider__scale-mark');
    const styleTop = marks[marks.length - 1].style.top;
    expect(styleTop).toBe('100%');
  });

  it('The second mark style top must be 5%', () => {
    const marks = document.querySelectorAll('.free-slider__scale-mark');
    const styleTop = marks[1].style.top;
    expect(styleTop).toBe('5%');
  });

  it('The first big mark style top must be 0%', () => {
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    const styleTop = bigMarks[0].style.top;
    expect(styleTop).toBe('0%');
  });

  it('The last big mark style top must be 100%', () => {
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    const styleTop = bigMarks[bigMarks.length - 1].style.top;
    expect(styleTop).toBe('100%');
  });

  it('The second big mark style top must be 20%', () => {
    const bigMarks = document.querySelectorAll('.free-slider__scale-mark--big');
    const styleTop = bigMarks[1].style.top;
    expect(styleTop).toBe('20%');
  });

  it('Click on scale must be call handler with clientY values', () => {
    let values;
    const handler = jest.fn((clientY) => {
      values = clientY;
    });
    scale.clickEvent(handler);
    pointerEvent(scale.root, 'pointerdown');
    expect(values).toBe(300);
  });
});
