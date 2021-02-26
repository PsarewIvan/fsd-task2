import SliderElement from './SliderElement';
import { Settings, SizeType, DirectionType } from '../../types';

export default class Rail extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__rail']);
    this.state = state;
  }

  public getDistanceToScreen(): number {
    return this.root.getBoundingClientRect()[this.getDirectionType()];
  }

  private getDirectionType(): DirectionType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'left' : 'top';
  }

  public getSize(): number {
    return this.root[this.getSizeType()];
  }

  private getSizeType(): SizeType {
    const { orientation } = this.state;
    return orientation === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
  }
}
