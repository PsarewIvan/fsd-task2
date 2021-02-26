import SliderElement from './SliderElement';
import {
  ExpandedState,
  RequiredThumb,
  DirectionType,
  SizeType,
  CoordType,
} from '../../types';

export default class ThumbView {
  private state: ExpandedState;
  private thumbs: SliderElement[];

  constructor(rootNode: HTMLElement, state: ExpandedState) {
    this.state = state;
    this.render(rootNode);
  }

  // Отрисовывает необходимые ползунки в родительском элементе
  private render(rootNode: HTMLElement): void {
    if (this.state.type === 'range') {
      this.thumbs = [
        new SliderElement(rootNode, ['free-slider__thumb']),
        new SliderElement(rootNode, [
          'free-slider__thumb',
          'free-slider__thumb--second',
        ]),
      ];
    } else {
      this.thumbs = [new SliderElement(rootNode, ['free-slider__thumb'])];
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
    const direction = this.getDirectionType();
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style[direction] = `${percents[i] * 100}%`;
    });
  }

  // Обновляет числовое значение над ползунком
  public updateHints(values: Array<number>): void {
    const property = ['--input-value-first', '--input-value-second'];
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style.setProperty(property[i], `"${values[i]}"`);
    });
  }

  // Возвращает ширину или высоту ползунков
  // в зависимости от ориентации слайдера.
  // В случае нескольких ползунков, возвращает ширину первого
  public getThumbSize(): number {
    return this.thumbs[0].root[this.getSizeType()];
  }

  // Создает слушателей на ползунках для обработки событий
  // работы пользователя
  public addMouseListener(handler: Function, onFinish: Function): void {
    this.thumbs.forEach((thumb: SliderElement) => {
      this.mouseListener(thumb.root, handler, onFinish);
    });
  }

  // Слушатель для обработки пользовательских событий
  // при клике на ползунок и его движении
  private mouseListener(
    currentThumb: HTMLElement,
    handler: Function,
    onFinish: Function
  ): void {
    currentThumb.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      this.mouseMoveEvent(currentThumb, evt, handler, onFinish);
    });

    currentThumb.ondragstart = function () {
      return false;
    };
  }

  // Метод считывает движения пользователя при движении ползунков
  public mouseMoveEvent(
    currentThumb: HTMLElement,
    evt: PointerEvent,
    handler: Function,
    onFinish: Function
  ): void {
    const coord = this.getCoordType();
    const direction = this.getDirectionType();
    const clickOffset: number =
      evt[coord] -
      currentThumb.getBoundingClientRect()[direction] -
      this.getThumbSize() / 2;

    const onMouseMove = (evt: PointerEvent): void => {
      evt.preventDefault();
      const index: number = this.getCurrentThumbIndex(currentThumb);
      const thumbShift: number = evt[this.getCoordType()] - clickOffset;
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

  private getCurrentThumbIndex(currentThumb: HTMLElement): number {
    return this.thumbs.findIndex((thumb) => thumb.root === currentThumb);
  }

  // Возвращает объект с данными ползунка, который необходимо
  // подвинуть при клике на Track
  public requiredThumb(clickOffset: number): RequiredThumb {
    const reqThumdState: RequiredThumb = {
      index: 0,
      root: this.thumbs[0].root,
    };
    if (this.state.type === 'single') {
      return reqThumdState;
    }

    const range: number =
      this.getDistance(this.thumbs[1].root) -
      this.getDistance(this.thumbs[0].root);
    if (clickOffset > this.getDistance(this.thumbs[0].root) + range / 2) {
      reqThumdState.index = 1;
      reqThumdState.root = this.thumbs[1].root;
    }
    return reqThumdState;
  }

  // Вспомогательный метод, возвращает значение от ползунка
  // до края экрана
  private getDistance(elem: HTMLElement): number {
    return elem.getBoundingClientRect()[this.getDirectionType()];
  }

  private getDirectionType(): DirectionType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'left' : 'top';
  }

  private getSizeType(): SizeType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
  }

  private getCoordType(): CoordType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'clientX' : 'clientY';
  }
}
