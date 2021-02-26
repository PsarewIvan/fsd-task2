import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class Bar extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__bar'], state.orientation);
    this.state = state;
    this.root.style.pointerEvents = 'none';
  }

  // Обновляет расположение бара
  public update(percents: Array<number>): void {
    if (this.state.type === 'range') {
      this.root.style[this.getDirectionType()] = `${percents[0] * 100}%`;
      this.root.style[this.getSizeType()] = `${
        (percents[1] - percents[0]) * 100
      }%`;
    } else {
      this.root.style[this.getSizeType()] = `${percents[0] * 100}%`;
    }
  }
}
