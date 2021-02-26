import SliderElement from './SliderElement';
import { Settings } from '../../types';

export default class Rail extends SliderElement {
  readonly state: Settings;

  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__rail'], state.orientation);
    this.state = state;
  }
}
