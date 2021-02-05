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

  // public getTrackWorkingSize(thumbsSize: Array<number>): number {
  //   let trackWorkingSize: number;

  //   if (this.orientation === 'vertical') {
  //     if (this.type === 'range') {
  //       trackWorkingSize =
  //         this.root.offsetHeight - thumbsSize[0] / 2 - thumbsSize[1] / 2;
  //     } else {
  //       trackWorkingSize = this.root.offsetHeight - thumbsSize[0];
  //     }
  //   } else if (this.orientation === 'horizontal') {
  //     if (this.type === 'range') {
  //       trackWorkingSize =
  //         this.root.offsetWidth - thumbsSize[0] / 2 - thumbsSize[1] / 2;
  //     } else {
  //       trackWorkingSize = this.root.offsetWidth - thumbsSize[0];
  //     }
  //   }

  //   return trackWorkingSize;
  // }

  // public getOffsetToWindow(): number {
  //   let clientShift: number;
  //   if (this.orientation === 'horizontal') {
  //     clientShift = this.root.getBoundingClientRect().top;
  //   } else if (this.orientation === 'vertical') {
  //     clientShift = this.root.getBoundingClientRect().left;
  //   }

  //   return clientShift;
  // }

  // public getTrackClientRect(): DOMRect {
  //   return this.root.getBoundingClientRect();
  // }

  // public addMousedownListener(handler: Function): void {
  //   this.root.addEventListener('mousedown', (evt: MouseEvent) => {
  //     evt.preventDefault();

  //     this.observer.notify('clickToTrack', { evt: evt, handler: handler });
  //     this.observer.notify('moveThumbs', { evt: evt, handler: handler });

  //     this.root.ondragstart = function () {
  //       return false;
  //     };
  //   });
  // }
}
