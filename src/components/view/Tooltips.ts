import SliderElement from './SliderElement';
import { Settings } from '../../types';

class Tooltips {
  private root: HTMLElement;
  private min: SliderElement;
  private max: SliderElement;

  constructor(rootNode: HTMLElement) {
    this.root = rootNode;
  }

  public update(state: Settings): void {
    const isTooltipsRender = this.min && this.max;
    if (state.tooltips === true && !isTooltipsRender) {
      this.render(state);
    }
    if (state.tooltips) {
      this.updateMin(state.min);
      this.updateMax(state.max);
    }
    if (!state.tooltips && isTooltipsRender) {
      this.destroyAll();
    }
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

export default Tooltips;
