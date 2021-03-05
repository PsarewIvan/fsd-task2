import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class TrackView extends SliderElement {
  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__track'], state.orientation);
  }
  // Слушатель для обработки клика по треку
  public clickEvent(handler: Function): void {
    this.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      handler(evt[this.coordType], evt);
    });
  }
}
