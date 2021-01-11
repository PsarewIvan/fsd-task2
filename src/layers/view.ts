// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

export default class View {
  private html: string
  private el: HTMLElement
  private options: Object

  constructor(element: HTMLElement, settings: Object) {
    this.html = `
      <span class="my-slider__wrapper">
        <span class="my-slider__model">
          <span class="my-slider__line"></span>
          <span class="my-slider__min">${settings.min}</span>
          <span class="my-slider__max">${settings.max}</span>
          <span class="my-slider__value">${settings.value}</span>
        </span>
        <span class="my-slider__bar"></span>
        <span class="my-slider__handle"></span>
      </span>`;
    this.init(element);
  }

  public updateElement() {

  }

  private addElements() {
    this.el.insertAdjacentHTML('afterend', this.html);
  }

  private init(element: HTMLElement) {
    this.el = element;
    this.el.classList.add('my-slider__input');
    this.addElements();
  }
};
