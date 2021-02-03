// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings, State } from '../../types';
import Observer from '../makeObservable';
import Track from './Track';
import Thumbs from './Thumbs';
import Bar from './Bar';
import Scale from './Scale';
import Tooltips from './Tooltips';

export default class View {
  private root: HTMLElement;
  private slider: HTMLElement;
  private observer: Observer;
  private onChange: Function | undefined;
  private onFinish: Function | undefined;
  private isFirstChange: boolean;
  private inputValues: Array<number>;
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
    this.state = { type: settings.type, orientation: settings.orientation };
    this.max = settings.max;
    this.min = settings.min;

    this.render(settings);

    // this.observer = new Observer();
    // this.root = rootNode;
    // this.onChange = settings.onChange;
    // this.onFinish = settings.onFinish;
    // this.isFirstChange = true;

    // this.observer.subscribe('onFinish', this.runOnFinish);

    // this.slider = document.createElement('span');
    // this.slider.classList.add('free-slider');

    // this.track = new Track(this.observer, settings.type, settings.orientation);
    // this.bar = new Bar(settings.type, settings.orientation);
    // this.slider.append(this.track.root, this.bar.root);

    // if (settings.tooltips) {
    //   this.tooltips = new Tooltips();
    //   this.tooltips.updateValues(settings.min, settings.max);
    //   this.slider.append(this.tooltips.min.root);
    //   this.slider.append(this.tooltips.max.root);
    // }

    // if (settings.scale) {
    //   this.scale = new Scale(this.observer);
    //   this.slider.append(this.scale.root);
    // }

    // this.thumbs = new Thumbs(
    //   this.observer,
    //   settings.type,
    //   settings.orientation
    // );
    // this.slider.append(...this.thumbs.getRoot());
    // this.root.append(this.slider);

    // this.changeSliderClass(settings.orientation);
    // this.changeSlider(settings);
  }

  private render(settings: Settings): void {
    this.slider = document.createElement('span');
    if (settings.orientation === 'vertical') {
      this.slider.classList.add('free-slider', 'free-slider--vertical');
    } else if (settings.orientation === 'horizontal') {
      this.slider.classList.add('free-slider');
    }

    this.track = new Track(this.slider, {
      type: settings.type,
      orientation: settings.orientation,
    });
    this.bar = new Bar(this.slider, this.percentFromValues(settings.values), {
      type: settings.type,
      orientation: settings.orientation,
    });
    this.thumbs = new Thumbs(
      this.slider,
      this.percentFromValues(settings.values),
      {
        type: settings.type,
        orientation: settings.orientation,
        min: settings.min,
        max: settings.max,
      }
    );
    if (settings.scale) {
      // this.scale = new Scale();
    }
    if (settings.tooltips) {
      this.tooltips = new Tooltips(this.slider, {
        min: settings.min,
        max: settings.max,
      });
    }

    this.root.append(this.slider);
  }

  private percentFromValues(values: Array<number>): Array<number> {
    if (this.state.type === 'single') {
      return [(values[0] - this.min) / (this.max - this.min)];
    } else if (this.state.type === 'range') {
      return [
        (values[0] - this.min) / (this.max - this.min),
        (values[1] - this.min) / (this.max - this.min),
      ];
    }
  }

  public viewChanged(handler: Function) {
    // this.thumbs.getThumbsShift();
    // this.thumbs.mouseEvent(handler);
    // this.track.addMousedownListener(handler)
  }

  // public changeSlider(settings: Settings): void {
  //   this.inputValues =
  //     settings.type === 'range'
  //       ? [settings.from, settings.to]
  //       : [settings.value];

  //   this.thumbs.updateInputTooltip(this.inputValues);
  //   this.updatePins(settings);

  //   if (!this.isFirstChange && this.onChange) {
  //     this.onChange(this.inputValues);
  //     this.isFirstChange = false;
  //   }
  // }

  // private updatePins(settings: Settings): void {
  //   const thumbShift: Array<number> = this.getThumbShift(
  //     this.thumbs.getThumbsSize(),
  //     this.inputValues,
  //     settings
  //   );

  //   this.thumbs.moveThumbs(thumbShift);
  //   this.bar.moveBar(thumbShift);
  // }

  // private getThumbShift(
  //   thumbsOffsetSize: Array<number>,
  //   values: Array<number>,
  //   settings: Settings
  // ): Array<number> {
  //   const thumbsShift: Array<number> = [];

  //   thumbsOffsetSize.forEach((thumbSize, index) => {
  //     thumbsShift.push(
  //       ((this.track.getTrackSize() - thumbSize) *
  //         (values[index] - settings.min)) /
  //         (settings.max - settings.min) +
  //         thumbSize / 2
  //     );
  //   });

  //   return thumbsShift;
  // }

  // private changeSliderClass(orientation: string): void {
  //   console.log(this.slider);

  //   if (orientation === 'vertical') {
  //     this.slider.classList.add('free-slider--vertical');
  //   } else if (orientation === 'horizontal') {
  //     this.slider.classList.remove('free-slider--vertical');
  //   }
  // }

  // public updateView(handler: Function): void {
  //   this.track.addMousedownListener(handler);
  //   this.thumbs.mouseEvent(handler);
  // }

  // private runOnFinish(): void {
  //   if (this.onFinish) {
  //     this.onFinish(this.inputValues);
  //   }
  // }
}
