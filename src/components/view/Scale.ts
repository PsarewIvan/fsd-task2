import SliderElement from './SliderElement';
import Observer from '../makeObservable';

export default class Scale extends SliderElement {
  constructor(observer: Observer) {
    super('free-slider__scale');
  }
}
