export default class ElementFactory {
  static create(tag: string, elementClass?: string, text?: string) {
    const element = document.createElement(tag);
    element.classList.add(elementClass);
    element.innerHTML = text;
    return element;
  }
}
