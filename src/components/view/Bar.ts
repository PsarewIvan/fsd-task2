import SliderElement from './SliderElement';
import { State } from '../../types';

export default class TrackView extends SliderElement {
  private state: State;

  constructor(rootNode: HTMLElement, state: State) {
    super(rootNode, ['free-slider__bar']);
    this.state = state;
    this.root.style.pointerEvents = 'none';
  }

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

  // public moveBar(values: Array<number>) {
  //   if (this.orientation === 'vertical') {
  //     if (this.type === 'range') {
  //       this.root.style.top = `${values[0]}px`;
  //       this.root.style.height = `${values[1] - values[0]}px`;
  //     } else {
  //       this.root.style.height = `${values[0]}px`;
  //     }
  //   } else if (this.orientation === 'horizontal') {
  //     if (this.type === 'range') {
  //       this.root.style.left = `${values[0]}px`;
  //       this.root.style.width = `${values[1] - values[0]}px`;
  //     } else {
  //       this.root.style.width = `${values[0]}px`;
  //     }
  //   }
  // }
}
