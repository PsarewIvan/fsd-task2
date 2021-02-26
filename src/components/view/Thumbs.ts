import SliderElement from './SliderElement';
import { Settings, RequiredThumb } from '../../types';

export default class ThumbView {
  readonly state: Settings;
  private thumbs: SliderElement[];

  constructor(rootNode: HTMLElement, state: Settings) {
    this.state = state;
    this.render(rootNode);
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

  // Обновляет состояние ползунков
  public update(percents: Array<number>, values: Array<number>): void {
    this.updatePosition(percents);
    if (this.state.hints) {
      this.updateHints(values);
    }
  }

  // Обновляет местоположение ползунков на слайдере
  public updatePosition(percents: Array<number>): void {
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style[thumb.getDirectionType()] = `${percents[i] * 100}%`;
    });
  }

  // Обновляет числовое значение над ползунком
  public updateHints(values: Array<number>): void {
    const property = ['--input-value-first', '--input-value-second'];
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style.setProperty(property[i], `"${values[i]}"`);
    });
  }

  // Создает слушателей на ползунках для обработки событий
  // работы пользователя
  public addMouseListener(handler: Function, onFinish: Function): void {
    this.thumbs.forEach((thumb: SliderElement) => {
      this.mouseListener(thumb, handler, onFinish);
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

  // Метод считывает движения пользователя при движении ползунков
  public mouseMoveEvent(
    currentThumb: SliderElement,
    evt: PointerEvent,
    handler: Function,
    onFinish: Function
  ): void {
    const coord = currentThumb.getCoordType();
    const clickOffset: number =
      evt[coord] - currentThumb.getDistanceToScreen() - this.getThumbSize() / 2;

    const onMouseMove = (evt: PointerEvent): void => {
      evt.preventDefault();
      const index: number = this.getCurrentThumbIndex(currentThumb);
      const thumbShift: number = evt[coord] - clickOffset;
      handler(thumbShift, index);
    };

    const onMouseUp = (): void => {
      onFinish();
      document.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('pointerup', onMouseUp);
    };

    document.addEventListener('pointermove', onMouseMove);
    document.addEventListener('pointerup', onMouseUp);
  }

  private getCurrentThumbIndex(currentThumb: SliderElement): number {
    return this.thumbs.findIndex((thumb) => thumb.root === currentThumb.root);
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
      this.thumbs[1].getDistanceToScreen() -
      this.thumbs[0].getDistanceToScreen();
    if (clickOffset > this.thumbs[0].getDistanceToScreen() + range / 2) {
      reqThumdState.index = 1;
      reqThumdState.root = this.thumbs[1];
    }
    return reqThumdState;
  }

  public getThumbSize(): number {
    return this.thumbs[0].getSize();
  }
}
