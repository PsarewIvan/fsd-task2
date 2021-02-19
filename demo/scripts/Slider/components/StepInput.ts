import { Settings } from '../types';

export default class StepInput {
  private root: HTMLInputElement;

  constructor(slider: JQuery, state: Settings) {
    this.root = document.createElement('input');
    this.root.classList.add('slider__input-step');
    this.root.type = 'number';
    this.root.min = `0`;
    this.root.max = (state.max - state.min).toString();
    this.root.value = state.step.toString();
    const label = document.createElement('label');
    label.classList.add('slider__label', 'slider__label--step');
    label.innerHTML = `Step: `;
    label.append(this.root);
    slider.after(label);
  }

  public addEvent(handler: Function): void {
    this.root.addEventListener('change', () => {
      handler(Number(this.root.value));
    });
  }
}
