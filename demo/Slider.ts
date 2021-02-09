import { InputState } from './types';

export default class Slider {
  private slider: JQuery;
  private type: string | undefined;
  private single?: HTMLInputElement;
  private from?: HTMLInputElement;
  private to?: HTMLInputElement;
  private inputState: InputState;

  constructor(element: JQuery, options: Object) {
    this.slider = element;
    this.type = options.type;
    this.inputState = {
      min: options.min,
      max: options.max,
      step: options.step,
    };
    this.renderInput();
    options.onUpdate = this.updateInput.bind(this);
    options.onChange = this.updateInput.bind(this);
    this.slider.freeSlider(options);
    this.inputListener();
  }

  private renderInput(): void {
    if (this.type === 'range') {
      this.from = this.createInput();
      this.to = this.createInput();
      this.slider.append(this.from, this.to);
    } else {
      this.single = this.createInput();
      this.slider.append(this.single);
    }
  }

  private updateInput(values: number[]) {
    if (this.type === 'range') {
      this.from.value = `${values[0]}`;
      this.to.value = `${values[1]}`;
    } else {
      this.single.value = `${values[0]}`;
    }
  }

  private createInput(): HTMLInputElement {
    const elem: HTMLInputElement = document.createElement('input');
    elem.classList.add('slider__input');
    elem.type = 'number';
    elem.min = this.inputState.min.toString();
    elem.max = this.inputState.max.toString();
    elem.step = this.inputState.step.toString();
    return elem;
  }

  private inputListener() {
    if (this.type === 'range') {
      this.from.addEventListener('change', () => {
        if (Number(this.from.value) > Number(this.to.value)) {
          this.from.value = this.to.value;
        }
        if (Number(this.from.value) < this.inputState.min) {
          this.from.value = this.inputState.min.toString();
        }
        this.setValue([Number(this.from.value)]);
      });
      this.to.addEventListener('change', () => {
        if (Number(this.to.value) > this.inputState.max) {
          this.to.value = this.inputState.max.toString();
        }
        if (Number(this.to.value) < Number(this.from.value)) {
          this.to.value = this.from.value;
        }
        this.setValue([null, Number(this.to.value)]);
      });
    } else {
      this.single.addEventListener('change', () => {
        if (Number(this.single.value) > this.inputState.max) {
          this.single.value = this.inputState.max.toString();
        }
        if (Number(this.single.value) < this.inputState.min) {
          this.single.value = this.inputState.min.toString();
        }
        this.setValue([Number(this.single.value)]);
      });
    }
  }

  public getValue() {
    return this.slider.freeSlider('getValue');
  }

  public setValue(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
