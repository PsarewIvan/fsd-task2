import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class TrackView extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__track'], state.orientation);
    this.state = state;
  }

  // Возвращает расстояние от трека до края экрана
  public getDistanceToScreen(): number {
    return this.root.getBoundingClientRect()[this.getDirectionType()];
  }

  // Слушатель для обработки клика по треку
  public clickEvent(handler: Function): void {
    this.root.addEventListener('pointerdown', (evt: PointerEvent) => {
      evt.preventDefault();
      handler(evt[this.getCoordType()], evt);
    });
  }
}
