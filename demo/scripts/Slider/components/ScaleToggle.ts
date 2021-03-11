import InputElement from './InputElement';
import { Settings } from '../types';

class ScaleToggle extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super({
      wrapper: wrapper,
      type: 'checkbox',
      classMod: 'scale',
      labelText: 'Scale: ',
    });
    this.input.checked = state.scale;
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      handler({scale: this.input.checked});
    });
  }
}

export default ScaleToggle;
