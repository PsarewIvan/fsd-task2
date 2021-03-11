import InputElement from './InputElement';
import { Settings } from '../types';

class MaxInput extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super(wrapper, 'number', 'max', 'Max value:');
    this.input.value = state.max.toString();
    this.updateAttribute(state.values);
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      if (Number(this.input.value) < Number(this.input.min)) {
        this.input.value = this.input.min;
      }
      handler({max: Number(this.input.value)});
    });
  }

  public updateAttribute(values: number[]): void {
    this.input.min = values[values.length - 1].toString();
  }
}

export default MaxInput;
