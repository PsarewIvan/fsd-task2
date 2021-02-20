import { Settings } from '../types';

export default class MaxInput {
  private root: HTMLInputElement;

  constructor(slider: JQuery, state: Settings) {
    this.root = document.createElement('input');
    this.root.classList.add('slider__input-max');
    this.root.type = 'number';
    this.root.value = state.max.toString();
    this.updateAttribute(state.values);
    const label = document.createElement('label');
    label.classList.add('slider__label', 'slider__label--max');
    label.innerHTML = `Max: `;
    label.append(this.root);
    slider.after(label);
  }

  public addEvent(handler: Function): void {
    this.root.addEventListener('change', () => {
      if (Number(this.root.value) < Number(this.root.min)) {
        this.root.value = this.root.min;
      }
      handler(Number(this.root.value));
    });
  }

  public updateAttribute(values: number[]): void {
    this.root.min = values[values.length - 1].toString();
  }
}
