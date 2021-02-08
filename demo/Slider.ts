export default class Slider {
  private slider: JQuery;
  private single?: HTMLInputElement;
  private from?: HTMLInputElement;
  private to?: HTMLInputElement;

  constructor(element: JQuery, options: Object) {
    this.slider = element;
    this.slider.freeSlider(options);

    this.renderInput(options.type);
  }

  private renderInput(type: string): void {
    if (type === 'range') {
      this.from = this.createInput();
      this.to = this.createInput();
      this.slider.append(this.from, this.to);
    } else {
      this.single = this.createInput();
      this.slider.append(this.single);
    }
  }

  private createInput(): HTMLInputElement {
    const elem: HTMLInputElement = document.createElement('input');
    elem.classList.add('slider__input');
    elem.type = 'number';
    return elem;
  }

  public getValue() {
    return this.slider.freeSlider('getValue');
  }

  public setValue(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
