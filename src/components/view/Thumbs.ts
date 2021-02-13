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
    if (this.state.isHints) {
      this.updateHints(values);
    }
  }

  // Обновляет местоположение ползунков на слайдере
  public updatePosition(percents: Array<number>): void {
    const shift = this.getThumbSize() / 2;
    const direction = this.getDirectionType();
    this.thumbs.forEach((thumb: SliderElement, i: number) => {
      thumb.root.style[direction] = `calc(${percents[i] * 100}% + ${shift}px)`;
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
    currentThumb.addEventListener('mousedown', (evt) => {
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
    evt: MouseEvent,
    handler: Function,
    onFinish: Function
  ): void {
    let clickOffset: number;
    const coord = this.getCoordType();
    const direction = this.getDirectionType();
    clickOffset = evt[coord] - currentThumb.getBoundingClientRect()[direction];

    const onMouseMove = (evt: MouseEvent): void => {
      evt.preventDefault();
      this.updateThumbsShift(evt, currentThumb, clickOffset, handler);
    };

    const onMouseUp = (): void => {
      onFinish();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Вызывает переданный обработчик с параметрами движения ползунков
  private updateThumbsShift(
    evt: MouseEvent,
    currentThumb: HTMLElement,
    clickOffset: number,
    handler: Function
  ): void {
    let thumbShift: number;
    let index: number = this.getCurrentThumbIndex(currentThumb);
    thumbShift = evt[this.getCoordType()] - clickOffset;
    handler(thumbShift, index);
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
