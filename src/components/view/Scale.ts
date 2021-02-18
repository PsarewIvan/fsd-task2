import SliderElement from './SliderElement';
import { ScaleState, DirectionType, CoordType, SizeTypeCss } from '../../types';

export default class Scale extends SliderElement {
  private state: ScaleState;

  constructor(rootNode: HTMLElement, size: number, state: ScaleState) {
    super(rootNode, ['free-slider__scale']);
    this.state = state;
    this.root.style[this.getSizeType()] = `${size}%`;
    this.renderMark();
  }

  private renderMark(): void {
    let stepValue: number =
      (this.state.max - this.state.min) /
      (this.state.markNumber * this.state.subMarkNumber);
    for (
      let i = 0;
      i <= this.state.markNumber * this.state.subMarkNumber;
      i += 1
    ) {
      const markElement: HTMLElement = document.createElement('span');
      markElement.classList.add('free-slider__scale-mark');
      this.setPosition(markElement, i);
      if (i % this.state.subMarkNumber === 0) {
        const markTextElement: HTMLElement = document.createElement('span');
        this.root.append(markTextElement);
        markTextElement.classList.add('free-slider__scale-text');
        this.setPosition(markTextElement, i);
        markTextElement.innerHTML = (stepValue * i + this.state.min).toString();
        markElement.classList.add('free-slider__scale-mark--big');
      }
      this.root.append(markElement);
    }
  }

  private setPosition(element: HTMLElement, i: number): void {
    element.style[this.getDirectionType()] = `${
      (i * 100) / (this.state.markNumber * this.state.subMarkNumber)
    }%`;
  }

  public clickEvent(handler: Function): void {
    this.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      handler(evt[this.getCoordType()], evt);
    });
  }

  private getDirectionType(): DirectionType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'left' : 'top';
  }

  private getSizeType(): SizeTypeCss {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'width' : 'height';
  }

  private getCoordType(): CoordType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'clientX' : 'clientY';
  }
}
