import ValuesInputs from './components/ValuesInputs';
import StepInput from './components/StepInput';
import MinInput from './components/MinInput';
import MaxInput from './components/MaxInput';
import ScaleCheck from './components/ScaleCheck';
// import HintCheck from './components/HintCheck';
import OrientationCheck from './components/OrientationCheck';
import { Settings } from './types';

export default class Slider {
  private slider: JQuery;
  private valuesInputs: ValuesInputs;
  private stepInput: StepInput;
  private minInput: MinInput;
  private maxInput: MaxInput;
  private scaleCheck: ScaleCheck;
  private orientationCheck: OrientationCheck;
  private state: Settings;

  constructor(element: JQuery, options: Partial<Settings>) {
    this.slider = element;
    this.slider.freeSlider(options);
    this.updateState();
    if (this.state.orientation === 'horizontal') {
      this.slider.addClass('slider--horizontal');
    }
    if (this.state.orientation === 'vertical') {
      this.slider.addClass('slider--vertical');
    }
    this.orientationCheck = new OrientationCheck(this.slider, this.state);
    this.scaleCheck = new ScaleCheck(this.slider, this.state);
    this.maxInput = new MaxInput(this.slider, this.state);
    this.minInput = new MinInput(this.slider, this.state);
    this.stepInput = new StepInput(this.slider, this.state);
    this.valuesInputs = new ValuesInputs(this.slider, this.state);
    this.inputEvent();
    this.updateInputs();
    this.updateStep();
    this.updateMin();
    this.updateMax();
    this.updateScale();
    this.updateOrientation();
  }

  private inputEvent(): void {
    this.slider.freeSlider('onLoad', this.updateElements.bind(this));
    this.slider.freeSlider('onChange', this.updateElements.bind(this));
  }

  private updateElements(state: Partial<Settings>): void {
    this.updateState(state);
    this.minInput.updateAttribute(this.state.values);
    this.maxInput.updateAttribute(this.state.values);
    this.valuesInputs.updateInput(this.state);
  }

  private updateState(state?: Partial<Settings>): void {
    this.state = state ? state : this.slider.freeSlider('getState');
  }

  private updateInputs(): void {
    this.valuesInputs.addEvent(this.setValues.bind(this));
  }

  private updateStep(): void {
    this.stepInput.addEvent(this.changeStep.bind(this));
  }

  private updateMin(): void {
    this.minInput.addEvent(this.changeMin.bind(this));
  }

  private updateMax(): void {
    this.maxInput.addEvent(this.changeMax.bind(this));
  }

  private updateScale(): void {
    this.scaleCheck.addEvent(this.changeScale.bind(this));
  }

  private updateOrientation(): void {
    this.orientationCheck.addEvent(this.changeOrientation.bind(this));
  }

  private changeStep(step: number): void {
    this.slider.freeSlider('changeStep', step);
  }

  private changeMin(value: number): void {
    this.slider.freeSlider('changeMin', value);
  }

  private changeMax(value: number): void {
    this.slider.freeSlider('changeMax', value);
  }

  private changeScale(isScale: boolean): void {
    this.slider.freeSlider('changeScale', isScale);
  }

  private changeOrientation(orientation: 'vertical' | 'horizontal'): void {
    this.slider.toggleClass('slider--horizontal slider--vertical');
    this.slider.freeSlider('changeOrientation', orientation);
  }

  private setValues(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
