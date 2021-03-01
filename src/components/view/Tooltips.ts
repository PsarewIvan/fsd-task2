import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class Tooltips {
  private rootState: boolean;
  private root: HTMLElement;
  private min: SliderElement;
  private max: SliderElement;

  constructor(rootNode: HTMLElement, state: Settings) {
    this.rootState = state.tooltips;
    this.root = rootNode;
  }

  private render(state: Settings): void {
    this.min = new SliderElement(
      this.root,
      ['free-slider__min'],
      state.orientation,
      `${state.min}`
    );
    this.max = new SliderElement(
      this.root,
      ['free-slider__max'],
      state.orientation,
      `${state.max}`
    );
  }

  public update(state: Settings): void {
    if (state.tooltips === true && !this.min && !this.max) {
      this.render(state);
    }
    if (state.tooltips) {
      this.updateMin(state.min);
      this.updateMax(state.max);
    }
    if (!state.tooltips && this.min && this.max) {
      this.destroyAll();
    }
    this.rootState = state.tooltips;
  }

  private updateMin(min: number): void {
    if (this.min.root.innerHTML !== min.toString()) {
      this.min.root.innerHTML = min.toString();
    }
  }

  private updateMax(max: number): void {
    if (this.max.root.innerHTML !== max.toString()) {
      this.max.root.innerHTML = max.toString();
    }
  }

  private destroyAll(): void {
    this.max.root.remove();
    this.min.root.remove();
    delete this.max;
    delete this.min;
  }
}
