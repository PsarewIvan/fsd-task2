import SliderElement from './SliderElement';
import { Settings, RequiredThumb } from '../../types';

export default class ThumbView {
  readonly state: Settings;
  private property: string[];
  private thumbs: SliderElement[];

  constructor(rootNode: HTMLElement, state: Settings) {
    this.state = state;
    this.property = ['--input-value-first', '--input-value-second'];
    this.render(rootNode);
  }

  // Обновляет состояние ползунков
  public update(percents: number[], values: number[], hints: boolean): void {
    this.updatePosition(percents);
    if (hints) {
      this.updateHints(values);
    } else {
      this.clearHints();
    }
  }

  // Создает слушателей на ползунках для обработки событий
  // работы пользователя
  public addMouseListener(handler: Function, onFinish: Function): void {
    this.thumbs.forEach((thumb: SliderElement) => {
      this.mouseListener(thumb, handler, onFinish);
    });
  }

  // Метод считывает движения пользователя при движении ползунков
  public mouseMoveEvent(
    currentThumb: SliderElement,
    evt: PointerEvent,
    handler: Function,
    onFinish: Function
  ): void {
    const clickOffset: number =
      evt[currentThumb.coordType] -
      currentThumb.distanceToScreen -
      this.getThumbSize() / 2;

    const onMouseMove = (evt: PointerEvent): void => {
      evt.preventDefault();
      window.ontouchmove = (evt: Event) => {
        evt.preventDefault();
      };
      const index: number = this.getCurrentThumbIndex(currentThumb);
      const thumbShift: number = evt[currentThumb.coordType] - clickOffset;
      handler(thumbShift, index);
    };

    const onMouseUp = (): void => {
      if (typeof onFinish === 'function') onFinish();
      window.ontouchmove = null;
      document.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('pointerup', onMouseUp);
    };

    document.addEventListener('pointermove', onMouseMove);
    document.addEventListener('pointerup', onMouseUp);
  }

  // Возвращает объект с данными ползунка, который необходимо
  // подвинуть при клике на Track
  public requiredThumb(clickOffset: number): RequiredThumb {
    const reqThumdState: RequiredThumb = {
      index: 0,
      root: this.thumbs[0],
    };
    if (this.state.type === 'single') {
      return reqThumdState;
    }

    const range: number =
      this.thumbs[1].distanceToScreen - this.thumbs[0].distanceToScreen;
    if (clickOffset > this.thumbs[0].distanceToScreen + range / 2) {
      reqThumdState.index = 1;
      reqThumdState.root = this.thumbs[1];
    }
    return reqThumdState;
  }

  public getThumbSize(): number {
    return this.thumbs[0].size;
  }

  // Отрисовывает необходимые ползунки в родительском элементе
  private render(rootNode: HTMLElement): void {
    if (this.state.type === 'range') {
      this.thumbs = [
        new SliderElement(
          rootNode,
          ['free-slider__thumb'],
          this.state.orientation
        ),
        new SliderElement(
          rootNode,
          ['free-slider__thumb', 'free-slider__thumb--second'],
          this.state.orientation
        ),
      ];
    } else {
      this.thumbs = [
        new SliderElement(
          rootNode,
          ['free-slider__thumb'],
          this.state.orientation
        ),
      ];
    }
  }

  // Обновляет местоположение ползунков на слайдере
  private updatePosition(percents: Array<number>): void {
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      const currentPercent: number = Number(
        thumb.root.style[thumb.directionType].slice(0, -1)
      );
      if (percents[i] * 100 !== currentPercent) {
        thumb.root.style[thumb.directionType] = `${percents[i] * 100}%`;
      }
    });
  }

  // Обновляет числовое значение над ползунком
  private updateHints(values: Array<number>): void {
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style.setProperty(this.property[i], `"${values[i]}"`);
    });
  }

  private clearHints(): void {
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style.setProperty(this.property[i], ``);
    });
  }

  // Слушатель для обработки пользовательских событий
  // при клике на ползунок и его движении
  private mouseListener(
    currentThumb: SliderElement,
    handler: Function,
    onFinish: Function
  ): void {
    currentThumb.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      this.mouseMoveEvent(currentThumb, evt, handler, onFinish);
    });

    currentThumb.root.ondragstart = function () {
      return false;
    };
  }

  private getCurrentThumbIndex(currentThumb: SliderElement): number {
    return this.thumbs.findIndex((thumb) => thumb.root === currentThumb.root);
  }
}
