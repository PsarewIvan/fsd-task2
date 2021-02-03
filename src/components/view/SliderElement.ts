import ElementFactory from './ElementFactory';

export default class sliderElement {
  public root: HTMLElement;

  constructor(
    rootNode: HTMLElement,
    elementClass: Array<string>,
    text?: string
  ) {
    this.root = ElementFactory.create('span', elementClass, text);
    rootNode.append(this.root);
  }
}
