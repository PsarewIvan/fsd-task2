import ValuesInputs from './components/ValuesInputs';
import StepInput from './components/StepInput';
import MinInput from './components/MinInput';
import MaxInput from './components/MaxInput';
import ScaleToggle from './components/ScaleToggle';
import OrientationChange from './components/OrientationChange';
import HintToggle from './components/HintToggle';
import TooltipsToggle from './components/TooltipsToggle';
import { Settings, ElementsType } from './types';

class Slider {
  private slider: JQuery;
  private elements: ElementsType;
  private inputsPanel: HTMLDivElement;
  private state: Settings;

  constructor(element: JQuery, options: Partial<Settings>) {
    this.slider = element;
    this.createPanel();
    this.addClass(options.orientation);
    this.slider.freeSlider(options);
    this.updateState();
    this.createElements();
    this.inputEvent();
    this.updateCaller();
  }

  private createPanel(): void {
    this.inputsPanel = document.createElement('div');
    this.inputsPanel.classList.add('slider__panel');
    this.slider.after(this.inputsPanel);
  }

  private addClass(orientation: string): void {
    const modificator: string =
      orientation === 'vertical' ? 'vertical' : 'horizontal';
    this.slider.addClass(`slider__wrapper--${modificator}`);
  }

  private updateState(state?: Partial<Settings>): void {
    this.state = state ? state : this.slider.freeSlider('getState');
  }

  private createElements(): void {
    this.elements = [
      new ValuesInputs(this.inputsPanel, this.state),
      new MinInput(this.inputsPanel, this.state),
      new MaxInput(this.inputsPanel, this.state),
      new StepInput(this.inputsPanel, this.state),
      new HintToggle(this.inputsPanel, this.state),
      new TooltipsToggle(this.inputsPanel, this.state),
      new ScaleToggle(this.inputsPanel, this.state),
      new OrientationChange(this.inputsPanel, this.state),
    ];
  }

  private inputEvent(): void {
    this.slider.freeSlider('onLoad', this.updateElements.bind(this));
    this.slider.freeSlider('onChange', this.updateElements.bind(this));
  }

  private updateCaller(): void {
    this.elements.forEach((element) => {
      element.addEvent(this.update.bind(this));
    });
  }

  private updateElements(state: Partial<Settings>): void {
    this.updateState(state);
    this.elements[0].updateInput(this.state);
    this.elements[1].updateAttribute(this.state.values);
    this.elements[2].updateAttribute(this.state.values);
  }

  private update(state: Partial<Settings>): void {
    this.changeClass(state.orientation);
    this.slider.freeSlider('update', state);
  }

  private changeClass(orientation: string): void {
    if (orientation) {
      this.slider.toggleClass(
        'slider__wrapper--horizontal slider__wrapper--vertical'
      );
    }
  }
}

export default Slider;
