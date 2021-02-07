import SliderElement from './SliderElement';

export default class Scale extends SliderElement {
  private markNumber: number;
  private subMarkNumber: number;
  private min: number;
  private max: number;

  constructor(
    rootNode: HTMLElement,
    scaleMark: number,
    subScaleMark: number,
    min: number,
    max: number
  ) {
    super(rootNode, ['free-slider__scale']);
    this.markNumber = scaleMark;
    this.subMarkNumber = subScaleMark;
    this.min = min;
    this.max = max;
    this.render();
  }

  private render(): void {
    const range = this.max - this.min;
    for (let i = 0; i <= this.markNumber * this.subMarkNumber; i++) {
      const markElement: HTMLElement = document.createElement('span');
      markElement.classList.add('free-slider__sclae-mark');
      if (i === 0) {
        markElement.innerHTML = this.min.toString();
      }
      if (i === this.markNumber * this.subMarkNumber) {
        markElement.innerHTML = this.max.toString();
      }
      if (i % this.subMarkNumber === 0) {
        markElement.classList.add('free-slider__scale-mark--big');
      }
      this.root.append(markElement);
    }
  }
}
