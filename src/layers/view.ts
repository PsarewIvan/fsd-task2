// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

export default class View {
  private html: string
  private el: HTMLElement
  private options: Object

  constructor(element, options) {
    this.html = `
      <span class="my-slider-wrapper">
        <span class="my-slider">
          <span class="my-slider__line"></span>
          <span class="my-slider__min">0</span>
          <span class="my-slider__max">1</span>
          <span class="my-slider__value">0</span>
        </span>
        <span class="my-slider__bar"></span>
        <span class="my-slider__handle"></span>
      </span>`;
    this.init(element, options);
  }

  private addElements() {
    this.el.insertAdjacentHTML('afterend', this.html);
  }

  private init(element, options) {
    this.el = element;
    this.options = options;
    this.addElements();
  }
};
