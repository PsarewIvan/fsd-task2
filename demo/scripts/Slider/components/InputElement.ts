export default class HintToogle {
  readonly input: HTMLInputElement;
  readonly label: HTMLLabelElement;

  constructor(
    wrapper: HTMLDivElement,
    type: string,
    classMod: string,
    labelText: string = '',
    name?: string,
    value?: string
  ) {
    this.input = document.createElement('input');
    this.input.classList.add(`slider__input`, `slider__input--${classMod}`);
    this.input.type = type;
    if (name) {
      this.input.name = name;
    }
    if (value) {
      this.input.value = value;
    }
    this.label = document.createElement('label');
    this.label.classList.add(`slider__label`, `slider__label--${classMod}`);
    this.label.innerHTML = labelText;
    this.label.append(this.input);
    wrapper.append(this.label);
  }
}
