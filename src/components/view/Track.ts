import SliderElement from './SliderElement';
import Observer from '../makeObservable';

export default class TrackView extends SliderElement {
  private orientation: string;
  private type: string;

  constructor(observer: Observer, type: string, orientation: string) {
    super('free-slider__track', observer);
    this.type = type;
    this.orientation = orientation;
    this.observer.subscribe('getTrackRect', this.getTrackClientRect);
    this.observer.subscribe('getTrackWorkingSize', this.getTrackWorkingSize);
  }

  public getTrackSize(): number {
    let trackSize: number;

    if (this.orientation === 'horizontal') {
      trackSize = this.root.offsetWidth;
    } else if (this.orientation === 'vertical') {
      trackSize = this.root.offsetHeight;
    }

    return trackSize;
  }

  public getTrackWorkingSize(thumbsSize: Array<number>): number {
    let trackWorkingSize: number;

    if (this.orientation === 'vertical') {
      if (this.type === 'range') {
        trackWorkingSize =
          this.root.offsetHeight - thumbsSize[0] / 2 - thumbsSize[1] / 2;
      } else {
        trackWorkingSize = this.root.offsetHeight - thumbsSize[0];
      }
    } else if (this.orientation === 'horizontal') {
      if (this.type === 'range') {
        trackWorkingSize =
          this.root.offsetWidth - thumbsSize[0] / 2 - thumbsSize[1] / 2;
      } else {
        trackWorkingSize = this.root.offsetWidth - thumbsSize[0];
      }
    }

    return trackWorkingSize;
  }

  public getOffsetToWindow(): number {
    let clientShift: number;
    if (this.orientation === 'horizontal') {
      clientShift = this.root.getBoundingClientRect().top;
    } else if (this.orientation === 'vertical') {
      clientShift = this.root.getBoundingClientRect().left;
    }

    return clientShift;
  }

  public getTrackClientRect(): DOMRect {
    return this.root.getBoundingClientRect();
  }

  public addMousedownListener(handler: Function): void {
    this.root.addEventListener('mousedown', (evt: MouseEvent) => {
      evt.preventDefault();

      this.observer.notify('clickToTrack', { evt: evt, handler: handler });
      this.observer.notify('moveThumbs', { evt: evt, handler: handler });

      this.root.ondragstart = function () {
        return false;
      };
    });
  }
}
