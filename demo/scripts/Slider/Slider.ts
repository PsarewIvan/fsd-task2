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
  private panelStates: HTMLDivElement;
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
    this.panelStates = document.createElement('div');
    this.panelStates.classList.add('slider__panel');
    this.slider.after(this.panelStates);
    if (options.orientation !== 'vertical') {
      this.slider.addClass('slider__wrapper--horizontal');
    }
    if (options.orientation === 'vertical') {
      this.slider.addClass('slider__wrapper--vertical');
    }
    this.slider.freeSlider(options);
    this.updateState();
    this.valuesInputs = new ValuesInputs(this.panelStates, this.state);
    this.minInput = new MinInput(this.panelStates, this.state);
    this.maxInput = new MaxInput(this.panelStates, this.state);
    this.stepInput = new StepInput(this.panelStates, this.state);
    this.hintToggle = new HintToggle(this.panelStates, this.state);
    this.tooltipsToggle = new TooltipsToggle(this.panelStates, this.state);
    this.scaleToggle = new ScaleToggle(this.panelStates, this.state);
    this.orientationChange = new OrientationChange(
      this.panelStates,
      this.state,
      this.slider
    );
    this.inputEvent();
    this.updateValues();
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

  private updateValues(): void {
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
    this.slider.freeSlider('showScale', isScale);
  }

  private changeOrientation(orientation: 'vertical' | 'horizontal'): void {
    this.slider.toggleClass(
      'slider__wrapper--horizontal slider__wrapper--vertical'
    );
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
