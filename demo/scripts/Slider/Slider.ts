import ValuesInputs from './components/ValuesInputs';
// import StepInput from './components/StepInput';
// import MinInput from './components/MinInput';
// import MaxInput from './components/MaxInput';
// import ScaleCheck from './components/ScaleCheck';
// import HintCheck from './components/HintCheck';
// import OrientationCheck from './components/OrientationCheck';
import { Settings } from './types';

export default class Slider {
  private slider: JQuery;
  private valuesInputs: ValuesInputs;
  private state: Settings;

  constructor(element: JQuery, options) {
    this.slider = element;
    this.slider.freeSlider(options);
    this.updateState();
    this.valuesInputs = new ValuesInputs(this.slider, this.state);
    this.inputEvent();
    this.updateSlider();
  }

  private updateState(): void {
    this.state = this.slider.freeSlider('getState');
  }

  private inputEvent(): void {
    this.slider.freeSlider(
      'onLoad',
      this.valuesInputs.updateValue.bind(this.valuesInputs)
    );
    this.slider.freeSlider(
      'onChange',
      this.valuesInputs.updateValue.bind(this.valuesInputs)
    );
  }

  private updateSlider(): void {
    this.valuesInputs.addEvent(this.setValues.bind(this));
  }

  public getValues(): any {
    return this.slider.freeSlider('getValue');
  }

  public setValues(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
