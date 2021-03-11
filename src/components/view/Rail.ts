import SliderElement from './SliderElement';
import { Settings } from '../../types';

class Rail extends SliderElement {
  constructor(rootNode: HTMLElement, state: Settings) {
    super(rootNode, ['free-slider__rail'], state.orientation);
  }
}

export default Rail;
