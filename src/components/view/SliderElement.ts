import ElementFactory from './ElementFactory';
import Observer from '../makeObservable';

export default class sliderElement {
  public root: HTMLElement;
  public observer?: Observer;

  constructor(elementClass: string, observer?: Observer) {
    this.root = ElementFactory.create('span', elementClass);
    if (observer) {
      this.observer = observer;
    }
  }
}
