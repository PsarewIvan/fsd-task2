export default class sliderElement {
  public root: HTMLElement;

  constructor(
    rootNode: HTMLElement,
    elementClass: Array<string>,
    text?: string
  ) {
    this.root = this.create('span', elementClass, text);
    rootNode.append(this.root);
  }

  private create(tag: string, elementClass?: Array<string>, text?: string) {
    const element = document.createElement(tag);
    element.classList.add(...elementClass);
    if (text) {
      element.innerHTML = text;
    }
    return element;
  }
}
