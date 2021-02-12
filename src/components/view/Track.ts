import SliderElement from './SliderElement';
import { State, SizeType, DirectionType, CoordType } from '../../types';

export default class TrackView extends SliderElement {
  private state: State;

  constructor(rootNode: HTMLElement, state: State) {
    super(rootNode, ['free-slider__track']);
    this.state = state;
  }

  public getTrackSize(): number {
    return this.root[this.getSizeType()];
  }

  // Возвращает расстояние от трека до края экрана
  public getDistanceToScreen(): number {
    return this.root.getBoundingClientRect()[this.getDirectionType()];
  }

  // Слушатель для обработки клика по треку
  public clickEvent(handler: Function): void {
    this.root.addEventListener('mousedown', (evt: MouseEvent) => {
      evt.preventDefault();
      handler(evt[this.getCoordType()], evt);
    });
  }

  private getDirectionType(): DirectionType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'left' : 'top';
  }

  private getSizeType(): SizeType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
  }

  private getCoordType(): CoordType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'clientX' : 'clientY';
  }
}