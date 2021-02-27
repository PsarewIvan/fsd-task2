import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class Scale extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__scale'], state.orientation);
    this.state = state;
    this.render(state);
  }

  public render(state: Settings): void {
    this.root.innerHTML = '';
    const markNumber = state.scaleMark * state.subScaleMark;
    const stepValue: number =
      (state.max - state.min) / (state.scaleMark * state.subScaleMark);
    for (let i = 0; i <= markNumber; i += 1) {
      this.renderMark(markNumber, i, state.subScaleMark);
      this.renderTick(markNumber, state.subScaleMark, i, stepValue, state.min);
    }
  }

  private renderMark(markNumber: number, index: number, subMark: number): void {
    const markElement: HTMLElement = document.createElement('span');
    markElement.classList.add('free-slider__scale-mark');
    markElement.style[this.directionType] = `${(index * 100) / markNumber}%`;
    if (index % subMark === 0) {
      markElement.classList.add('free-slider__scale-mark--big');
    }
    this.root.append(markElement);
  }

  private renderTick(
    markNumber: number,
    subMark: number,
    index: number,
    step: number,
    min: number
  ): void {
    if (index % subMark === 0) {
      const tick: HTMLElement = document.createElement('span');
      tick.classList.add('free-slider__scale-text');
      tick.style[this.directionType] = `${(index * 100) / markNumber}%`;
      const ticlValue = this.round(step * index + min, 5);
      tick.innerHTML = ticlValue.toString();
      this.root.append(tick);
    }
  }

  public clickEvent(handler: Function): void {
    this.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      handler(evt[this.coordType], evt);
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
