import InputElement from './InputElement';
import { Settings } from '../types';

class TooltipsToggle extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super(wrapper, 'checkbox', 'tooltips', 'Tooltips: ');
    this.input.checked = state.hints;
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      handler({ tooltips: this.input.checked });
    });
  }
}

export default TooltipsToggle;
