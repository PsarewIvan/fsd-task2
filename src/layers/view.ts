// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import {IModelSettings} from './interfaces';

export default class View {
  private html: string;
  private inputElement: HTMLElement;
  private sliderElement: HTMLElement;
  private barElement: HTMLElement;
  private pinElement: HTMLElement;
  private lineElement: HTMLElement;
  private minElement: HTMLElement;
  private maxElement: HTMLElement;
  private valueElement: HTMLElement;

  private limitCords: Object;

  constructor(element: HTMLElement, settings: IModelSettings) {
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
    this.pinElement.style.left = `${settings.value * (this.lineElement.offsetWidth - this.pinElement.offsetWidth) / (settings.max - settings.min) + this.pinElement.offsetWidth / 2}px`;
  }

  private changePin(settings: Object): void {
    const onMouseMoveCall = (moveEvt: Object): void => {
      this.onMouseMove.call(this, moveEvt, settings);
    }

    const onMouseUp = (): void => {
      this.pinElement.style.willChange = 'auto';
      document.removeEventListener('mousemove', onMouseMoveCall);
      document.removeEventListener('mouseup', onMouseUp);
    }

    this.pinElement.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this.pinElement.style.willChange = 'left';

      // Выключает изменение эффектов
      // const onMouseUp= function(upEvt: Object): void {
      //   upEvt.preventDefault();

      //   document.removeEventListener('mousemove', onMouseMoveCall);
      //   document.removeEventListener('mouseup', onMouseUp);
      // }

      document.addEventListener('mousemove', onMouseMoveCall);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  private onMouseMove(moveEvt: Object, settings: Object): void {
    moveEvt.preventDefault();

    let pinCords: Number = this.pinElement.offsetLeft + moveEvt.movementX;

    if (pinCords < this.limitCords.min) {
      pinCords = this.limitCords.min;
    }
    if (pinCords > this.limitCords.max) {
      pinCords = this.limitCords.max;
    }

    this.inputElement.value = this.pinElement.offsetLeft * (settings.max - settings.min) / this.lineElement.offsetWidth + settings.min;
    this.pinElement.style.left = `${pinCords}px`;
  }

  private changeLimitCords(): void {
    this.limitCords = {
      min: this.lineElement.offsetLeft + this.pinElement.offsetWidth / 2,
      max: this.lineElement.offsetLeft + this.lineElement.offsetWidth - this.pinElement.offsetWidth / 2
    };
  }

  private init(element: HTMLElement, settings: Object): void {
    this.inputElement = element;
    this.inputElement.classList.add('my-slider__input');
    this.addElements();
    this.sliderElement = this.inputElement.parentElement.querySelector('.my-slider__wrapper');
    this.barElement = this.sliderElement.querySelector('.my-slider__bar');
    this.pinElement = this.sliderElement.querySelector('.my-slider__handle');
    this.lineElement = this.sliderElement.querySelector('.my-slider__line');
    this.minElement = this.sliderElement.querySelector('.my-slider__min');
    this.maxElement = this.sliderElement.querySelector('.my-slider__max');
    this.valueElement = this.sliderElement.querySelector('.my-slider__value');

    this.changeLimitCords();
    this.drawSlider(settings);
    this.changePin(settings);
  }
};
