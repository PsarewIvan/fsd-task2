import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class Scale extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__scale'], state.orientation);
    this.state = state;
    this.renderMark(state);
  }

  public renderMark(state: Settings): void {
    this.root.innerHTML = '';
    let stepValue: number =
      (state.max - state.min) / (state.scaleMark * state.subScaleMark);
    for (let i = 0; i <= state.scaleMark * state.subScaleMark; i += 1) {
      const markElement: HTMLElement = document.createElement('span');
      markElement.classList.add('free-slider__scale-mark');
      this.setPosition(state, markElement, i);
      if (i % state.subScaleMark === 0) {
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

  private setPosition(state: Settings, element: HTMLElement, i: number): void {
    element.style[this.getDirectionType()] = `${
      (i * 100) / (state.scaleMark * state.subScaleMark)
    }%`;
  }

  public clickEvent(handler: Function): void {
    this.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      handler(evt[this.getCoordType()], evt);
    });
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
