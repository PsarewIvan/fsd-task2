import InputElement from './InputElement';
import { Settings } from '../types';

class HintToggle extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super({
      wrapper: wrapper,
      type: 'checkbox',
      classMod: 'hint',
      labelText: 'Hints: ',
    });
    this.input.checked = state.hints;
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      handler({ hints: this.input.checked });
    });
  }
}

export default HintToggle;
