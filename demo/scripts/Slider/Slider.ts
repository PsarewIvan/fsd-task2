import ValuesInputs from './components/ValuesInputs';
import StepInput from './components/StepInput';
// import MinInput from './components/MinInput';
// import MaxInput from './components/MaxInput';
// import ScaleCheck from './components/ScaleCheck';
// import HintCheck from './components/HintCheck';
// import OrientationCheck from './components/OrientationCheck';
import { Settings } from './types';

export default class Slider {
  private slider: JQuery;
  private valuesInputs: ValuesInputs;
  private stepInput: StepInput;
  private state: Settings;

  constructor(element: JQuery, options: Settings) {
    this.slider = element;
    this.slider.freeSlider(options);
    this.updateState();
    this.stepInput = new StepInput(this.slider, this.state);
    this.valuesInputs = new ValuesInputs(this.slider, this.state);
    this.inputEvent();
    this.updateInputs();
  }

  private updateElements(state: Settings): void {
    this.updateState(state);
    this.valuesInputs.updateInput(this.state);
  }

  private updateState(state?: Settings): void {
    this.state = state ? state : this.slider.freeSlider('getState');
  }

  private inputEvent(): void {
    this.slider.freeSlider('onLoad', this.updateElements.bind(this));
    this.slider.freeSlider('onChange', this.updateElements.bind(this));
  }

  private updateInputs(): void {
    this.valuesInputs.addEvent(this.setValues.bind(this));
  }

  public getValues(): any {
    return this.slider.freeSlider('getValue');
  }

  public setValues(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
