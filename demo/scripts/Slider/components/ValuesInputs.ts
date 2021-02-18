import { Settings } from '../types';

export default class ValuesInputs {
  private root: HTMLElement;
  private elements: HTMLInputElement[];

  constructor(slider: JQuery, state: Settings) {
    this.root = document.createElement('div');
    this.root.classList.add('slider__input-wrapper');
    this.elements = [];

    state.values.forEach((_value, i: number) => {
      this.elements.push(this.createInput());
      this.updateAttribute(state);
      this.root.append(this.elements[i]);
    });
    slider.after(this.root);
  }

  private createInput(): HTMLInputElement {
    const elem: HTMLInputElement = document.createElement('input');
    elem.classList.add('slider__input');
    elem.type = 'number';
    return elem;
  }

  public updateInput(state: Settings): void {
    this.updateValue(state.values);
    this.updateAttribute(state);
  }

  private updateValue(values: number[]): void {
    values.forEach((value: number, i: number) => {
      this.elements[i].value = `${value}`;
    });
  }

  private updateAttribute(state: Settings): void {
    this.elements.forEach((input: HTMLInputElement, i: number): void => {
      input.max = this.elements[i + 1]
        ? state.values[i + 1].toString()
        : state.max.toString();
      input.min =
        this.elements[i - 1] && i > 0
          ? state.values[i - 1].toString()
          : state.min.toString();
      input.step = state.step.toString();
    });
  }

  public addEvent(handler: Function): void {
    this.elements.forEach((input: HTMLInputElement, i: number) => {
      input.addEventListener('change', () => {
        const values = [];
        values[i] = Number(input.value);
        handler(values);
      });
    });
  }
}
