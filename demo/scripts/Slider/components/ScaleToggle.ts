import InputElement from './InputElement';
import { Settings } from '../types';

export default class ScaleToggle extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super(wrapper, 'checkbox', 'scale', 'Scale: ');
    this.input.checked = state.scale;
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      handler({scale: this.input.checked});
    });
  }
}
