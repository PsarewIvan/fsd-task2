import InputElement from './InputElement';
import { Settings } from '../types';

class HintToogle extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super(wrapper, 'checkbox', 'hint', 'Hints: ');
    this.input.checked = state.hints;
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      handler({hints: this.input.checked});
    });
  }
}

export default HintToogle;
