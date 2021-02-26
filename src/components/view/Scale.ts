import SliderElement from './SliderElement';
import { ScaleState, DirectionType, CoordType, SizeTypeCss } from '../../types';

export default class Scale extends SliderElement {
  private state: ScaleState;

  constructor(rootNode: HTMLElement, state: ScaleState) {
    super(rootNode, ['free-slider__scale']);
    this.state = state;
    this.renderMark(state);
  }

  public renderMark(state: ScaleState): void {
    this.root.innerHTML = '';
    let stepValue: number =
      (state.max - state.min) / (state.markNumber * state.subMarkNumber);
    for (let i = 0; i <= state.markNumber * state.subMarkNumber; i += 1) {
      const markElement: HTMLElement = document.createElement('span');
      markElement.classList.add('free-slider__scale-mark');
      this.setPosition(state, markElement, i);
      if (i % state.subMarkNumber === 0) {
        const markTextElement: HTMLElement = document.createElement('span');
        this.root.append(markTextElement);
        markTextElement.classList.add('free-slider__scale-text');
        this.setPosition(state, markTextElement, i);
        const markTextValue = this.round(stepValue * i + state.min, 5);
        markTextElement.innerHTML = markTextValue.toString();
        markElement.classList.add('free-slider__scale-mark--big');
      }
      this.root.append(markElement);
    }
  }

  private setPosition(
    state: ScaleState,
    element: HTMLElement,
    i: number
  ): void {
    element.style[this.getDirectionType()] = `${
      (i * 100) / (state.markNumber * state.subMarkNumber)
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

  // Метод для округления неточных значений
  private round(
    number: number,
    digits = 0,
    base = Math.pow(10, digits)
  ): number {
    return Math.round(base * number) / base;
  }
}
