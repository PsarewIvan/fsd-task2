import SliderElement from './SliderElement';

export default class Rail extends SliderElement {
  constructor(rootNode: HTMLElement) {
    super(rootNode, ['free-slider__rail']);
  }
}
