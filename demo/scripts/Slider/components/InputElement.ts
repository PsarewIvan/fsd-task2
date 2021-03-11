import { InputElementState } from '../types';

class InputElement {
  readonly input: HTMLInputElement;
  readonly label: HTMLLabelElement;

  constructor(state: InputElementState) {
    this.input = document.createElement('input');
    this.input.classList.add(
      `slider__input`,
      `slider__input--${state.classMod}`
    );
    this.input.type = state.type;
    if (state.name) {
      this.input.name = state.name;
    }
    if (state.value) {
      this.input.value = state.value;
    }
    this.label = document.createElement('label');
    this.label.classList.add(
      `slider__label`,
      `slider__label--${state.classMod}`
    );
    this.label.innerHTML = state.labelText ? state.labelText : '';
    this.label.append(this.input);
    state.wrapper.append(this.label);
  }
}

export default InputElement;
