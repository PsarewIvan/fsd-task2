// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings, RequiredThumb, SliderOrientation } from '../../types';
import Track from './Track';
import Thumbs from './Thumbs';
import Bar from './Bar';
import Scale from './Scale';
import Tooltips from './Tooltips';

export default class View {
  private root: HTMLElement;
  private slider: HTMLElement;
  private onChange: Function | undefined;
  private onUpdate: Function | undefined;
  private isFirstChange: boolean;
  private track: Track;
  private bar: Bar;
  private scale?: Scale;
  private thumbs: Thumbs;
  private tooltips?: Tooltips;

  constructor(rootNode: HTMLElement, settings: Settings) {
    this.root = rootNode;
    this.onChange = settings.onChange;
    this.onUpdate = settings.onUpdate;
    this.isFirstChange = true;

    this.createWrapper(settings.orientation);
    this.render(settings);
    this.update(settings);
  }

  // Создает необходимые компоненты слайдера и размещает их
  // в созданном родительском компоненте, который помещается
  // в элемент на котором был создан слайдер
  private render(settings: Settings): void {
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
      hints: settings.hints,
    });
    if (settings.scale) {
      this.scale = new Scale(this.slider, this.calcScaleWidth(), {
        orientation: settings.orientation,
        markNumber: settings.scaleMark,
        subMarkNumber: settings.subScaleMark,
        min: settings.min,
        max: settings.max,
      });
    }
    if (settings.tooltips) {
      this.tooltips = new Tooltips(this.slider, {
        min: settings.min,
        max: settings.max,
      });
    }
  }

  private createWrapper(orientation: SliderOrientation): void {
    this.slider = document.createElement('span');
    if (orientation === 'vertical') {
      this.slider.classList.add('free-slider', 'free-slider--vertical');
    } else if (orientation === 'horizontal') {
      this.slider.classList.add('free-slider', 'free-slider--horizontal');
    }
    this.root.append(this.slider);
  }

  // Обновляет положение движущихся элементов слайдера
  public update(settings: Settings): void {
    this.thumbs.update(
      this.formatPercents(settings.percents, 'thumb'),
      settings.values
    );
    this.bar.update(this.formatPercents(settings.percents, 'bar'));
    if (this.tooltips) {
      this.tooltips.update(settings.min, settings.max);
    }
    if (this.scale) {
      this.scale.renderMark({
        orientation: settings.orientation,
        markNumber: settings.scaleMark,
        subMarkNumber: settings.subScaleMark,
        min: settings.min,
        max: settings.max,
      });
    }

    if (this.onUpdate && this.isFirstChange) {
      this.onUpdate(settings.values);
      this.isFirstChange = false;
    }
    if (this.onChange && !this.isFirstChange) {
      this.onChange(settings.values);
    }
  }

  // Форматирует текущее процентное значение в проценты необходимые
  // для отрисовки компонентов слайдера
  private formatPercents(
    percents: number[],
    subViewType: 'thumb' | 'bar'
  ): number[] {
    const trackSize: number = this.track.getTrackSize();
    const thumbsSize: number = this.thumbs.getThumbSize();
    const ratio: number = (trackSize - thumbsSize) / trackSize;
    const formatPercents = [];
    if (subViewType === 'thumb') {
      percents.forEach((percent) => {
        formatPercents.push(percent * ratio);
      });
    }
    if (subViewType === 'bar') {
      const extraRatio: number = thumbsSize / trackSize / 2;
      percents.forEach((percent) => {
        formatPercents.push(percent * ratio + extraRatio);
      });
    }
    return formatPercents;
  }

  // Создает слушателей за наблюдением состояния слайдера
  // при взаимодействии пользователя
  public viewChanged(handler: Function, onFinish: Function) {
    // Слушатель на ползунки
    this.thumbs.addMouseListener((thumbShift: number, index: number) => {
      const percent = this.percentFromThumbShift(thumbShift);
      handler(percent, index);
    }, onFinish);

    // Слушатель на клики по треку
    this.track.clickEvent((clickCoord: number, evt: PointerEvent) => {
      this.clickHandler(clickCoord, handler, evt, onFinish);
    });

    // Слушатель на шкалу значений
    if (this.scale) {
      this.scale.clickEvent((clickCoord: number, evt: PointerEvent) => {
        this.clickHandler(clickCoord, handler, evt, onFinish);
      });
    }
  }

  // Функция обработчик, вызывающаяся для перемещения ползунков
  private clickHandler(
    clickCoord: number,
    handler: Function,
    evt: PointerEvent,
    onFinish: Function
  ): void {
    const clickOffset: number = clickCoord - this.thumbs.getThumbSize() / 2;
    const percent = this.percentFromThumbShift(clickOffset);
    const requiredThumb: RequiredThumb = this.thumbs.requiredThumb(clickOffset);
    handler(percent, requiredThumb.index);

    this.thumbs.mouseMoveEvent(
      requiredThumb.root,
      evt,
      (thumbShift: number) => {
        const percent = this.percentFromThumbShift(thumbShift);
        handler(percent, requiredThumb.index);
      },
      onFinish
    );
  }

  // Возвращает значение смещения ползунка в процентах, относительно
  // ширины рабочей области слайдера
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

  private calcScaleWidth(): number {
    return (
      ((this.track.getTrackSize() - this.thumbs.getThumbSize()) /
        this.track.getTrackSize()) *
      100
    );
  }
}
