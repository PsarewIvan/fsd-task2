import { Settings } from '../types';

export default class MinInput {
  private root: HTMLInputElement;

  constructor(slider: JQuery, state: Settings) {
    this.root = document.createElement('input');
    this.root.classList.add('slider__input-min');
    this.root.type = 'number';
    this.root.value = state.min.toString();
    this.updateAttribute(state.values);
    const label = document.createElement('label');
    label.classList.add('slider__label', 'slider__label--min');
    label.innerHTML = `Min: `;
    label.append(this.root);
    slider.after(label);
  }

  public addEvent(handler: Function): void {
    this.root.addEventListener('change', () => {
      if (Number(this.root.value) > Number(this.root.max)) {
        this.root.value = this.root.max;
      }
      handler(Number(this.root.value));
    });
  }

  public updateAttribute(values: number[]): void {
    this.root.max = values[0].toString();
  }
}
