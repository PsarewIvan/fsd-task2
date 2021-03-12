import SliderElement from './SliderElement';
import { Settings, TickState } from '../../types';

class Scale extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__scale'], state.orientation);
    this.state = state;
  }

  public render(state: Settings): void {
    this.clearRoot();
    const markNumber = state.scaleMark * state.subScaleMark;
    const step: number =
      (state.max - state.min) / (state.scaleMark * state.subScaleMark);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i <= markNumber; i += 1) {
      const mark = this.renderMark(markNumber, i, state.subScaleMark);
      const tick = this.renderTick({
        markNumber,
        subMark: state.subScaleMark,
        index: i,
        step,
        min: state.min,
      });
      fragment.append(mark, tick ? tick : '');
    }
    this.root.append(fragment);
  }

  public update(state: Settings = this.state): void {
    if (state.scale) {
      this.render(state);
    }
    if (!state.scale) {
      this.clearRoot(true);
    }
  }

  public clearRoot(isDisplayNone: boolean = false): void {
    this.root.innerHTML = '';
    this.root.style.display = isDisplayNone ? 'none' : 'block';
  }

  public clickEvent(handler: Function): void {
    this.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      handler(evt[this.coordsType], evt);
    });
  }

  private renderMark(
    markNumber: number,
    index: number,
    subMark: number
  ): HTMLElement {
    const markElement: HTMLElement = document.createElement('span');
    markElement.classList.add('free-slider__scale-mark');
    markElement.style[this.directionType] = `${(index * 100) / markNumber}%`;
    if (index % subMark === 0) {
      markElement.classList.add('free-slider__scale-mark--big');
    }
    return markElement;
  }

  private renderTick(state: TickState): HTMLElement {
    if (state.index % state.subMark === 0) {
      const tick: HTMLElement = document.createElement('span');
      tick.classList.add('free-slider__scale-text');
      tick.style[this.directionType] = `${
        (state.index * 100) / state.markNumber
      }%`;
      const tickValue = this.round(state.step * state.index + state.min, 5);
      tick.innerHTML = tickValue.toString();
      return tick;
    }
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

export default Scale;
