import { Settings } from '../types';

export default class OrientationChange {
  private inputs: HTMLInputElement[];
  private labels: HTMLLabelElement[];
  private wrapper: HTMLDivElement;

  constructor(slider: JQuery, state: Settings) {
    this.createWrapper();
    this.createInputs(slider[0].id, state.orientation);
    this.addInputsToLabels();
    this.wrapper.append(...this.labels);
    slider.after(this.wrapper);
  }

  private createInputs(id: string, orientation: string): void {
    this.inputs = [];
    this.inputs.push(this.createInput('horizontal', id, orientation));
    this.inputs.push(this.createInput('vertical', id, orientation));
  }

  private addInputsToLabels(): void {
    this.labels = [];
    this.inputs.forEach((input) => {
      const label = this.createLabel(
        input.value[0].toUpperCase() + input.value.slice(1)
      );
      label.prepend(input);
      this.labels.push(label);
    });
  }

  private createWrapper(): void {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('slider__orientation-wrapper');
    this.wrapper.innerHTML = '<p>Orientation:</p>';
  }

  private createInput(
    value: string,
    id: string,
    orientation: string
  ): HTMLInputElement {
    const element = document.createElement('input');
    element.classList.add('slider__input-orientation');
    element.type = 'radio';
    element.name = `orientation-${id}`;
    element.value = value;
    if (value === orientation) {
      element.checked = true;
    }
    return element;
  }

  private createLabel(text: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.classList.add('slider__label', 'slider__label--orientation');
    label.innerHTML = text;
    return label;
  }

  public addEvent(handler: Function): void {
    this.inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('change', () => {
        handler(input.value);
      });
    });
  }
}
