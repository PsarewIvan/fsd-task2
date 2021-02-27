import { Settings } from '../types';

export default class ScaleCheck {
  private root: HTMLInputElement;

  constructor(slider: JQuery, state: Settings) {
    this.root = document.createElement('input');
    this.root.classList.add('slider__input-step');
    this.root.type = 'checkbox';
    this.root.checked = state.scale;
    const label = document.createElement('label');
    label.classList.add('slider__label', 'slider__label--scale');
    label.innerHTML = `Scale: `;
    label.append(this.root);
    slider.after(label);
  }

  public addEvent(handler: Function): void {
    this.root.addEventListener('change', () => {
      handler();
    });
  }
}
