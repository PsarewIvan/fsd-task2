// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

export default class View {
  private html: string
  private inputElement: HTMLElement
  private sliderElement: HTMLElement
  private barElement: HTMLElement
  private pinElement: HTMLElement
  private minElement: HTMLElement
  private maxElement: HTMLElement
  private valueElement: HTMLElement

  constructor(element: HTMLElement, settings: Object) {
    this.html = `
      <span class="my-slider__wrapper">
        <span class="my-slider__model">
          <span class="my-slider__line"></span>
          <span class="my-slider__min">0</span>
          <span class="my-slider__max">1</span>
          <span class="my-slider__value">0</span>
        </span>
        <span class="my-slider__bar"></span>
        <span class="my-slider__handle"></span>
      </span>`;
    this.init(element, settings);
  }

  private addElements(): void {
    this.inputElement.insertAdjacentHTML('afterend', this.html);
  }

  public drawSlider(settings: Object): void {
    this.minElement.innerHTML = settings.min;
    this.maxElement.innerHTML = settings.max;
    this.valueElement.innerHTML = settings.value;
  }

  private init(element: HTMLElement, settings: Object): void {
    this.inputElement = element;
    this.inputElement.classList.add('my-slider__input');
    this.addElements();
    this.sliderElement = this.inputElement.parentElement.querySelector('.my-slider__wrapper');
    this.barElement = this.sliderElement.querySelector('.my-slider__bar');
    this.pinElement = this.sliderElement.querySelector('.my-slider__handle');
    this.minElement = this.sliderElement.querySelector('.my-slider__min');
    this.maxElement = this.sliderElement.querySelector('.my-slider__max');
    this.valueElement = this.sliderElement.querySelector('.my-slider__value');

    this.drawSlider(settings);
  }
};
