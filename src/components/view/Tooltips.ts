import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class Tooltips {
  readonly state: Settings;
  private min: SliderElement;
  private max: SliderElement;

  constructor(rootNode: HTMLElement, state: Settings) {
    this.state = state;
    this.render(rootNode);
  }

  private render(rootNode: HTMLElement): void {
    this.min = new SliderElement(
      rootNode,
      ['free-slider__min'],
      `${this.state.min}`
    );
    this.max = new SliderElement(
      rootNode,
      ['free-slider__max'],
      `${this.state.max}`
    );
  }

  public update(min: number, max: number): void {
    this.min.root.innerHTML = min.toString();
    this.max.root.innerHTML = max.toString();
  }
}
