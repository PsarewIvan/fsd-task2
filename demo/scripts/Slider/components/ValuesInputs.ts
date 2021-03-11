import InputElement from './InputElement';
import { Settings } from '../types';

class ValuesInputs {
  private wrapper: HTMLDivElement;
  private elements: HTMLInputElement[];

  constructor(panel: HTMLDivElement, state: Partial<Settings>) {
    this.createWrapper();
    this.elements = [];
    state.values.forEach((_value, i: number) => {
      const element = new InputElement(
        this.wrapper,
        'number',
        'value',
        `Thumb ${i + 1}: `
      );
      this.elements.push(element.input);
      this.updateAttribute(state);
    });
    panel.append(this.wrapper);
  }

  private createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('slider__input-wrapper');
  }

  public updateInput(state: Partial<Settings>): void {
    this.updateValue(state.values);
    this.updateAttribute(state);
  }

  private updateValue(values: number[]): void {
    values.forEach((value: number, i: number) => {
      this.elements[i].value = `${value}`;
    });
  }

  private updateAttribute(state: Partial<Settings>): void {
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
        handler({ values: values });
      });
    });
  }
}

export default ValuesInputs;
