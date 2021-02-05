// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings, State } from '../../types';
import Track from './Track';
import Thumbs from './Thumbs';
import Bar from './Bar';
import Scale from './Scale';
import Tooltips from './Tooltips';

export default class View {
  private root: HTMLElement;
  private slider: HTMLElement;
  private onChange: Function | undefined;
  private onFinish: Function | undefined;
  private track: Track;
  private bar: Bar;
  private scale: Scale;
  private thumbs: Thumbs;
  private tooltips?: Tooltips;
  private state: State;
  private max: number;
  private min: number;

  constructor(rootNode: HTMLElement, settings: Settings) {
    this.root = rootNode;
    this.max = settings.max;
    this.min = settings.min;
    this.onChange = settings.onChange;
    this.onFinish = settings.onFinish;

    this.render(settings);
    this.update(settings);
  }

  private render(settings: Settings): void {
    this.slider = document.createElement('span');
    if (settings.orientation === 'vertical') {
      this.slider.classList.add('free-slider', 'free-slider--vertical');
    } else if (settings.orientation === 'horizontal') {
      this.slider.classList.add('free-slider');
    }
    this.root.append(this.slider);

    this.track = new Track(this.slider, {
      type: settings.type,
      orientation: settings.orientation,
    });
    this.bar = new Bar(this.slider, {
      type: settings.type,
      orientation: settings.orientation,
    });
    this.thumbs = new Thumbs(this.slider, {
      type: settings.type,
      orientation: settings.orientation,
      min: settings.min,
      max: settings.max,
    });
    if (settings.scale) {
      // this.scale = new Scale();
    }
    if (settings.tooltips) {
      this.tooltips = new Tooltips(this.slider, {
        min: settings.min,
        max: settings.max,
      });
    }
  }

  public update(settings: Settings): void {
    this.updateState(settings);
    const percentsToView: Array<number> = this.formatPercentsToSubview(
      settings.percents
    );
    this.thumbs.update(percentsToView, settings.values);
    this.bar.update(percentsToView);

    // this.onChange(settings.values);
  }

  private formatPercentsToSubview(percents: Array<number>): Array<number> {
    const trackSize: number = this.track.getTrackSize();
    const thumbsSize: number = this.thumbs.getThumbSize();
    const ratio: number = (trackSize - thumbsSize) / trackSize;
    if (this.state.type === 'single') {
      return [percents[0] * ratio];
    } else if (this.state.type === 'range') {
      return [percents[0] * ratio, percents[1] * ratio];
    }
  }

  public viewChanged(handler: Function) {
    this.thumbs.mouseEvent((thumbShift: number, type: string) => {
      const percent = this.percentFromThumbShift(thumbShift);
      handler(percent, type);
    });

    this.track.clickEvent((clickCoord: number) => {
      const clickOffset: number = clickCoord - this.thumbs.getThumbSize() / 2;
      const percent = this.percentFromThumbShift(clickOffset);
      const type: string = this.thumbs.requiredThumb(clickOffset);

      handler(percent, type);
    });
  }

  private percentFromThumbShift(thumbShift: number): number {
    const trackSize: number = this.track.getTrackSize();
    const distanceFromTrackToScreen: number = this.track.getDistanceToScreen();
    const thumbSize: number = this.thumbs.getThumbSize();
    let percent: number =
      (thumbShift - distanceFromTrackToScreen) / (trackSize - thumbSize);

    if (percent <= 0) {
      percent = 0;
    }
    if (percent >= 1) {
      percent = 1;
    }
    return percent;
  }

  private updateState(settings: Settings) {
    this.state = { type: settings.type, orientation: settings.orientation };
  }
}
