import SliderElement from './SliderElement';
import { State } from '../../types';

export default class TrackView extends SliderElement {
  private state: State;

  constructor(rootNode: HTMLElement, state: State) {
    super(rootNode, ['free-slider__track']);
    this.state = state;
  }

  public getTrackSize(): number {
    let trackSize: number;

    if (this.state.orientation === 'horizontal') {
      trackSize = this.root.offsetWidth;
    } else if (this.state.orientation === 'vertical') {
      trackSize = this.root.offsetHeight;
    }

    return trackSize;
  }

  public getDistanceToScreen(): number {
    const trackRect: DOMRect = this.root.getBoundingClientRect();
    if (this.state.orientation === 'horizontal') {
      return trackRect.left;
    } else if (this.state.orientation === 'vertical') {
      return trackRect.top;
    }
  }

  public clickEvent(handler: Function): void {
    this.root.addEventListener('mousedown', (evt: MouseEvent) => {
      evt.preventDefault();
      let clientOffset: number;
      if (this.state.orientation === 'horizontal') {
        clientOffset = evt.clientX;
      } else if (this.state.orientation === 'vertical') {
        clientOffset = evt.clientY;
      }
      handler(clientOffset, evt);
    });
  }
}
