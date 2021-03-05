// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings, RequiredThumb, SliderOrientation } from '../../types';
import Track from './Track';
import Rail from './Rail';
import Thumbs from './Thumbs';
import Bar from './Bar';
import Scale from './Scale';
import Tooltips from './Tooltips';

export default class View {
  private root: HTMLElement;
  private wrapper: HTMLElement;
  private isFirstChange: boolean;
  private track: Track;
  private rail: Rail;
  private bar: Bar;
  private scale: Scale;
  private thumbs: Thumbs;
  private tooltips: Tooltips;

  constructor(rootNode: HTMLElement, settings: Settings) {
    this.root = rootNode;
    this.isFirstChange = true;

    this.createWrapper(settings.orientation);
    this.render(settings);
    this.update(settings);
  }

  // Обновляет элементы слайдера
  public update(settings: Settings): void {
    this.thumbs.update(settings.percents, settings.values, settings.hints);
    this.bar.update(this.formatPercents(settings.percents));
    this.scale.update(settings);
    this.tooltips.update(settings);
    if (settings.onUpdate && this.isFirstChange) {
      settings.onUpdate(settings.values);
    }
    this.isFirstChange = false;
  }

  // Создает слушателей за наблюдением состояния слайдера
  // при взаимодействии пользователя
  public viewChange(handler: Function, onFinish: Function): void {
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

  public destroyAll(): void {
    this.root.innerHTML = '';
  }

  // Создает необходимые компоненты слайдера и размещает их
  // в созданном родительском компоненте, который помещается
  // в элемент на котором был создан слайдер
  private render(settings: Settings): void {
    this.track = new Track(this.wrapper, settings);
    this.rail = new Rail(this.wrapper, settings);
    this.bar = new Bar(this.wrapper, settings);
    this.thumbs = new Thumbs(this.rail.root, settings);
    this.scale = new Scale(this.rail.root, settings);
    this.tooltips = new Tooltips(this.wrapper);
  }

  private createWrapper(orientation: SliderOrientation): void {
    this.wrapper = document.createElement('span');
    if (orientation === 'vertical') {
      this.wrapper.classList.add('free-slider', 'free-slider--vertical');
    } else if (orientation === 'horizontal') {
      this.wrapper.classList.add('free-slider', 'free-slider--horizontal');
    }
    this.root.append(this.wrapper);
  }

  // Функция обработчик, вызывающаяся для перемещения ползунков
  private clickHandler(
    clickCoord: number,
    handler: Function,
    evt: PointerEvent,
    onFinish: Function
  ): void {
    const percent = this.percentFromThumbShift(clickCoord);
    const requiredThumb: RequiredThumb = this.thumbs.requiredThumb(clickCoord);
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
    const railSize: number = this.rail.size;
    const distanceFromRailToScreen: number = this.rail.distanceToScreen;
    let percent: number = (thumbShift - distanceFromRailToScreen) / railSize;
    if (percent <= 0) {
      percent = 0;
    }
    if (percent >= 1) {
      percent = 1;
    }
    return percent;
  }

  // Форматирует текущее процентное значение в проценты необходимые
  // для отрисовки бара
  private formatPercents(percents: number[]): number[] {
    const trackSize: number = this.track.size;
    const thumbsSize: number = this.thumbs.getThumbSize();
    const ratio: number = (trackSize - thumbsSize) / trackSize;
    const extraRatio: number = thumbsSize / trackSize / 2;
    const formatPercents = [];
    percents.forEach((percent) => {
      formatPercents.push(percent * ratio + extraRatio);
    });
    return formatPercents;
  }
}
