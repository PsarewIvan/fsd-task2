import InputElement from './InputElement';
import { Settings } from '../types';

export default class StepInput extends InputElement {
  constructor(wrapper: HTMLDivElement, state: Settings) {
    super(wrapper, 'number', 'step', 'Step: ');
    this.input.min = `0`;
    this.input.max = (state.max - state.min).toString();
    this.input.value = state.step.toString();
  }

  public addEvent(handler: Function): void {
    this.input.addEventListener('change', () => {
      handler({ step: Number(this.input.value) });
    });
  }
}
