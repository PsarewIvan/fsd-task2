import SliderElement from './SliderElement';

export default class Scale extends SliderElement {
  constructor(rootNode: HTMLElement) {
    super(rootNode, ['free-slider__scale']);
  }
}
