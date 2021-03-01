import ValuesInputs from './components/ValuesInputs';
import StepInput from './components/StepInput';
import MinInput from './components/MinInput';
import MaxInput from './components/MaxInput';
import ScaleToggle from './components/ScaleToggle';
import OrientationChange from './components/OrientationChange';
import HintToggle from './components/HintToggle';
import TooltipsToggle from './components/TooltipsToggle';
import { Settings } from './types';

export default class Slider {
  private slider: JQuery;
  private valuesInputs: ValuesInputs;
  private stepInput: StepInput;
  private minInput: MinInput;
  private maxInput: MaxInput;
  private scaleToggle: ScaleToggle;
  private orientationChange: OrientationChange;
  private hintToggle: HintToggle;
  private tooltipsToggle: TooltipsToggle;
  private state: Settings;

  constructor(element: JQuery, options: Partial<Settings>) {
    this.slider = element;
    if (options.orientation !== 'vertical') {
      this.slider.addClass('slider--horizontal');
    }
    if (options.orientation === 'vertical') {
      this.slider.addClass('slider--vertical');
    }
    this.slider.freeSlider(options);
    this.updateState();
    this.tooltipsToggle = new TooltipsToggle(this.slider, this.state);
    this.hintToggle = new HintToggle(this.slider, this.state);
    this.orientationChange = new OrientationChange(this.slider, this.state);
    this.scaleToggle = new ScaleToggle(this.slider, this.state);
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
    this.updateHint();
    this.updateTooltips();
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
    this.scaleToggle.addEvent(this.changeScale.bind(this));
  }

  private updateOrientation(): void {
    this.orientationChange.addEvent(this.changeOrientation.bind(this));
  }

  private updateHint(): void {
    this.hintToggle.addEvent(this.changeHint.bind(this));
  }

  private updateTooltips(): void {
    this.tooltipsToggle.addEvent(this.changeTooltips.bind(this));
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

  private changeHint(isHint: boolean): void {
    this.slider.freeSlider('showHint', isHint);
  }

  private changeTooltips(isTooltips: boolean): void {
    this.slider.freeSlider('showTooltips', isTooltips);
  }

  private setValues(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}
