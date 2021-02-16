export default class Slider {
  private slider: JQuery;
  private type: string | undefined;
  private inputs?: HTMLInputElement[];

  constructor(element: JQuery, options) {
    this.slider = element;
    this.type = options.type;
    this.slider.freeSlider(options);
    this.renderInput();
    this.inputEvent();
    this.updateSlider();
  }

  private renderInput(): void {
    const container = document.createElement('div');
    container.classList.add('slider__input-wrapper');
    this.inputs = [];
    this.getValue().forEach((value, i: number) => {
      this.inputs.push(this.createInput());
      container.append(this.inputs[i]);
    });
    this.slider.after(container);
  }

  private createInput(): HTMLInputElement {
    const elem: HTMLInputElement = document.createElement('input');
    elem.classList.add('slider__input');
    elem.type = 'number';
    return elem;
  }

  private inputEvent() {
    this.slider.freeSlider('onLoad', this.updateInputs.bind(this));
    this.slider.freeSlider('onChange', this.updateInputs.bind(this));
  }

  private updateInputs(values: number[]) {
    values.forEach((value: number, i: number) => {
      this.inputs[i].value = `${value}`;
    });
  }

  private updateSlider() {
    this.inputs.forEach((input: HTMLInputElement, i: number) => {
      input.addEventListener('change', () => {
        const values = [];
        values[i] = Number(input.value);
        this.setValue(values);
        input.value = this.getValue()[i].toString();
      });
    });
  }

  public getValue(): number[] {
    return this.slider.freeSlider('getValue');
  }

  public setValue(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
