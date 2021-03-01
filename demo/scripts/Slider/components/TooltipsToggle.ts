import { Settings } from '../types';

export default class TooltipsToggle {
  private root: HTMLInputElement;

  constructor(slider: JQuery, state: Settings) {
    this.root = document.createElement('input');
    this.root.classList.add('slider__input-tooltips');
    this.root.type = 'checkbox';
    this.root.checked = state.hints;
    const label = document.createElement('label');
    label.classList.add('slider__label', 'slider__label--tooltips');
    label.innerHTML = `Tooltips: `;
    label.append(this.root);
    slider.after(label);
  }

  public addEvent(handler: Function): void {
    this.root.addEventListener('change', () => {
      handler(this.root.checked);
    });
  }
}
