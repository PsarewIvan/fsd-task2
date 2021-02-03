export default class ElementFactory {
  static create(tag: string, elementClass?: Array<string>, text?: string) {
    const element = document.createElement(tag);
    element.classList.add(...elementClass);
    if (text) {
      element.innerHTML = text;
    }
    return element;
  }
}
