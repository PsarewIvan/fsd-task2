import SliderElement from './SliderElement';
import { State } from '../../types';

export default class TrackView extends SliderElement {
  private state: State;

  constructor(rootNode: HTMLElement, state: State) {
    super(rootNode, ['free-slider__bar']);
    this.state = state;
    this.root.style.pointerEvents = 'none';
  }

  // Обновляет расположение бара
  public update(percents: Array<number>): void {
    if (this.state.orientation === 'vertical') {
      if (this.state.type === 'range') {
        this.root.style.top = `${percents[0] * 100}%`;
        this.root.style.height = `${(percents[1] - percents[0]) * 100}%`;
      } else if (this.state.type === 'single') {
        this.root.style.height = `${percents[0] * 100}%`;
      }
    } else if (this.state.orientation === 'horizontal') {
      if (this.state.type === 'range') {
        this.root.style.left = `${percents[0] * 100}%`;
        this.root.style.width = `${(percents[1] - percents[0]) * 100}%`;
      } else if (this.state.type === 'single') {
        this.root.style.width = `${percents[0] * 100}%`;
      }
    }
  }
}
