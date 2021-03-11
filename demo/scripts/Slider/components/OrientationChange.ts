import InputElement from './InputElement';
import { Settings } from '../types';

class OrientationChange {
  private inputs: HTMLInputElement[];
  private wrapper: HTMLDivElement;
  static id: number;

  constructor(panel: HTMLDivElement, state: Settings) {
    OrientationChange.id += 1;
    this.createWrapper();
    this.createInputs(
      this.wrapper,
      OrientationChange.id.toString(),
      state.orientation
    );
    panel.append(this.wrapper);
  }

  private createInputs(
    wrapper: HTMLDivElement,
    id: string,
    orientation: string
  ): void {
    const horizontal = new InputElement(
      wrapper,
      'radio',
      'orientation',
      'Horizontal',
      `orientation-${id}`,
      'horizontal'
    );
    const vertical = new InputElement(
      wrapper,
      'radio',
      'orientation',
      'Vertical',
      `orientation-${id}`,
      'vertical'
    );
    if (orientation === 'horizontal') {
      horizontal.input.checked = true;
    }
    if (orientation === 'vertical') {
      vertical.input.checked = true;
    }
    this.inputs = [];
    this.inputs.push(horizontal.input);
    this.inputs.push(vertical.input);
  }

  private createWrapper(): void {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('slider__orientation-wrapper');
    this.wrapper.innerHTML = '<p>Orientation:</p>';
  }

  public addEvent(handler: Function): void {
    this.inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('change', () => {
        handler({orientation: input.value});
      });
    });
  }
}

OrientationChange.id = 0;
export default OrientationChange;
