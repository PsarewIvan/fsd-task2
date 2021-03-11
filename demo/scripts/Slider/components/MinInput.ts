import InputElement from './InputElement';
import { Settings } from '../types';

class MinInput extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super({
      wrapper: wrapper,
      type: 'number',
      classMod: 'min',
      labelText: 'Min value:',
    });
    this.input.value = state.min.toString();
    this.updateAttribute(state.values);
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      if (Number(this.input.value) > Number(this.input.max)) {
        this.input.value = this.input.max;
      }
      handler({ min: Number(this.input.value) });
    });
  }

  public updateAttribute(values: number[]): void {
    this.input.max = values[0].toString();
  }
}

export default MinInput;
