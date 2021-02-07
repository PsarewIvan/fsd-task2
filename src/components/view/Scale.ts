import SliderElement from './SliderElement';

export default class Scale extends SliderElement {
  private markNumber: number;
  private subMarkNumber: number;
  private min: number;
  private max: number;
  private orientation: string;

  constructor(
    rootNode: HTMLElement,
    orientation: string,
    scaleMark: number,
    subScaleMark: number,
    min: number,
    max: number,
    size: number
  ) {
    super(rootNode, ['free-slider__scale']);
    this.markNumber = scaleMark;
    this.subMarkNumber = subScaleMark;
    this.orientation = orientation;
    this.min = min;
    this.max = max;
    if (this.orientation === 'horizontal') {
      this.root.style.width = `${size}%`;
    } else if (this.orientation === 'vertical') {
      this.root.style.height = `${size}%`;
    }
    this.renderMark();
  }

  private renderMark(): void {
    let stepValue: number =
      (this.max - this.min) / (this.markNumber * this.subMarkNumber);
    for (let i = 0; i <= this.markNumber * this.subMarkNumber; i++) {
      const markElement: HTMLElement = document.createElement('span');
      markElement.classList.add('free-slider__scale-mark');
      this.setPosition(markElement, i);
      if (i % this.subMarkNumber === 0) {
        const markTextElement: HTMLElement = document.createElement('span');
        this.root.append(markTextElement);
        markTextElement.classList.add('free-slider__scale-text');
        this.setPosition(markTextElement, i);
        markTextElement.innerHTML = (stepValue * i + this.min).toString();
        markElement.classList.add('free-slider__scale-mark--big');
      }
      this.root.append(markElement);
    }
  }

  private setPosition(element: HTMLElement, i: number): void {
    if (this.orientation === 'horizontal') {
      element.style.left = `${
        (i * 100) / (this.markNumber * this.subMarkNumber)
      }%`;
    } else if (this.orientation === 'vertical') {
      element.style.top = `${
        (i * 100) / (this.markNumber * this.subMarkNumber)
      }%`;
    }
  }
}
