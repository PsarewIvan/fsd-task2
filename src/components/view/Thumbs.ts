import SliderElement from './SliderElement';
import {
  ExpandedState,
  RequiredThumb,
  ThumbType,
  DirectionType,
  SizeType,
  CoordType,
} from '../../types';
import sliderElement from './SliderElement';

export default class ThumbView {
  private state: ExpandedState;
  private thumbs: sliderElement[];

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
  // в зависимости от ориентации слайдера
  public getThumbSize(): number {
    const size = this.getSizeType();
    return this.thumbs[0].root[size];
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
    let type: ThumbType = this.getCurrentThumbType(currentThumb);
    const coord = this.getCoordType();
    thumbShift = evt[coord] - clickOffset;
    handler(thumbShift, type);
  }

  // Вспомогательный метод, возвращающий тип переданного в параметры ползунка
  private getCurrentThumbType(currentThumb: HTMLElement): ThumbType {
    const rangeThumbTypes: Array<ThumbType> = ['single', 'from', 'to'];
    if (this.state.type === 'single') return rangeThumbTypes[0];
    const i = this.thumbs.findIndex((thumb) => thumb.root === currentThumb);
    return rangeThumbTypes[i + 1];
  }

  // Возвращает объект с данными ползунка, который необходимо
  // подвинуть при клике на Track
  public requiredThumb(clickOffset: number): RequiredThumb {
    if (this.state.type === 'single') {
      return {
        name: 'single',
        root: this.thumbs[0].root,
      };
    }

    const range: number =
      this.getDistance(this.thumbs[1].root) -
      this.getDistance(this.thumbs[0].root);
    if (clickOffset <= this.getDistance(this.thumbs[0].root) + range / 2) {
      return {
        name: 'from',
        root: this.thumbs[0].root,
      };
    } else {
      return {
        name: 'to',
        root: this.thumbs[1].root,
      };
    }
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
