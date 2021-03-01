import {
  SliderOrientation,
  DirectionType,
  SizeType,
  OffsetSizeType,
  CoordType,
} from '../../types';

export default class sliderElement {
  public root: HTMLElement;
  readonly orientation: SliderOrientation;

  constructor(
    rootNode: HTMLElement,
    elementClass: Array<string>,
    orientation: SliderOrientation,
    text?: string
  ) {
    this.orientation = orientation;
    this.root = this.create('span', elementClass, text);
    rootNode.append(this.root);
  }

  private create(tag: string, elementClass?: Array<string>, text?: string) {
    const element = document.createElement(tag);
    element.classList.add(...elementClass);
    if (text) {
      element.innerHTML = text;
    }
    return element;
  }

  // Вспомогательные методы
  public get distanceToScreen(): number {
    return this.root.getBoundingClientRect()[this.directionType];
  }

  public get size(): number {
    return this.root[this.offsetSize];
  }

  public get directionType(): DirectionType {
    return this.orientation === 'horizontal' ? 'left' : 'top';
  }

  public get sizeType(): SizeType {
    return this.orientation === 'horizontal' ? 'width' : 'height';
  }

  public get offsetSize(): OffsetSizeType {
    return this.orientation === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
  }

  public get coordType(): CoordType {
    return this.orientation === 'horizontal' ? 'clientX' : 'clientY';
  }
}
