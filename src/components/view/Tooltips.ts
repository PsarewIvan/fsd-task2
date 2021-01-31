import SliderElement from './SliderElement';

export default class Tooltips {
  public min: SliderElement;
  public max: SliderElement;

  constructor() {
    this.min = new SliderElement('free-slider__min');
    this.max = new SliderElement('free-slider__max');
  }

  public updateValues(min: number, max: number) {
    this.min.root.innerHTML = `${min}`;
    this.max.root.innerHTML = `${max}`;
  }
}
