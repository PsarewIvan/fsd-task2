import SliderElement from './SliderElement';
import { ScaleState } from '../../types';

export default class Scale extends SliderElement {
  private state: ScaleState;

  constructor(rootNode: HTMLElement, size: number, state: ScaleState) {
    super(rootNode, ['free-slider__scale']);
    this.state = state;
    if (this.state.orientation === 'horizontal') {
      this.root.style.width = `${size}%`;
    } else if (this.state.orientation === 'vertical') {
      this.root.style.height = `${size}%`;
    }
    this.renderMark();
  }

  private renderMark(): void {
    let stepValue: number =
      (this.state.max - this.min) /
      (this.state.markNumber * this.state.subMarkNumber);
    for (
      let i = 0;
      i <= this.state.markNumber * this.state.subMarkNumber;
      i++
    ) {
      const markElement: HTMLElement = document.createElement('span');
      markElement.classList.add('free-slider__scale-mark');
      this.setPosition(markElement, i);
      if (i % this.state.subMarkNumber === 0) {
        const markTextElement: HTMLElement = document.createElement('span');
        this.root.append(markTextElement);
        markTextElement.classList.add('free-slider__scale-text');
        this.setPosition(markTextElement, i);
        markTextElement.innerHTML = (stepValue * i + this.min).toString();
        markElement.classList.add('free-slider__scale-mark--big');
      }
      this.root.append(markElement);
    }
  }

  private setPosition(element: HTMLElement, i: number): void {
    if (this.state.orientation === 'horizontal') {
      element.style.left = `${
        (i * 100) / (this.state.markNumber * this.state.subMarkNumber)
      }%`;
    } else if (this.state.orientation === 'vertical') {
      element.style.top = `${
        (i * 100) / (this.state.markNumber * this.state.subMarkNumber)
      }%`;
    }
  }

  public clickEvent(handler: Function): void {
    this.root.addEventListener('mousedown', (evt: MouseEvent) => {
      evt.preventDefault();
      let clientOffset: number;
      if (this.state.orientation === 'horizontal') {
        clientOffset = evt.clientX;
      } else if (this.state.orientation === 'vertical') {
        clientOffset = evt.clientY;
      }
      handler(clientOffset, evt);
    });
  }
}
