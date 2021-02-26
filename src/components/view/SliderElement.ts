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
  public getDistanceToScreen(): number {
    return this.root.getBoundingClientRect()[this.getDirectionType()];
  }

  public getSize(): number {
    return this.root[this.getOffsetSize()];
  }

  public getDirectionType(): DirectionType {
    return this.orientation === 'horizontal' ? 'left' : 'top';
  }

  public getSizeType(): SizeType {
    return this.orientation === 'horizontal' ? 'width' : 'height';
  }

  public getOffsetSize(): OffsetSizeType {
    return this.orientation === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
  }

  public getCoordType(): CoordType {
    return this.orientation === 'horizontal' ? 'clientX' : 'clientY';
  }
}
