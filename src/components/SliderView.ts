// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings } from '../types';

export default class SliderView {
  private html: string;
  private root: HTMLElement;
  private inputElement: HTMLElement;
  private barElement: HTMLElement;
  private pinElement: HTMLElement;
  private lineElement: HTMLElement;
  private minElement: HTMLElement;
  private maxElement: HTMLElement;
  private onChange: Function | undefined;
  private onFinish: Function | undefined;
  public inputValue: number;

  constructor(rootNode: HTMLElement, settings: Settings) {
    this.onChange = settings.onChange;
    this.onFinish = settings.onFinish;

    this.render(rootNode);
    this.initSliderElement();
    this.updateHandlePosition(settings);

    this.inputValue = settings.value;
    this.inputElement.value = this.inputValue;
    this.pinElement.style.setProperty('--input-value', `"${this.inputValue}"`);
  }

  private render(root: HTMLElement) {
    this.html = `
      <span class="free-slider__wrapper">
        <input class="free-slider__input" type="text" name="free-slider">
        <span class="free-slider__model">
          <span class="free-slider__line"></span>
          <span class="free-slider__min">0</span>
          <span class="free-slider__max">1</span>
        </span>
        <span class="free-slider__bar"></span>
        <span class="free-slider__handle"></span>
      </span>`;
    this.root = root;
    this.root.innerHTML = this.html;
  }

  private initSliderElement() {
    this.inputElement = this.root.querySelector('.free-slider__input');
    this.barElement = this.root.querySelector('.free-slider__bar');
    this.pinElement = this.root.querySelector('.free-slider__handle');
    this.lineElement = this.root.querySelector('.free-slider__line');
    this.minElement = this.root.querySelector('.free-slider__min');
    this.maxElement = this.root.querySelector('.free-slider__max');
  }

  private updateHandlePosition(settings: Settings): void {
    this.minElement.innerHTML = `${settings.min}`;
    this.maxElement.innerHTML = `${settings.max}`;

    const offsetPin: string = `${(settings.value - settings.min) * (this.lineElement.offsetWidth - this.pinElement.offsetWidth) / (settings.max - settings.min) + this.pinElement.offsetWidth / 2}px`;
    this.pinElement.style.left = offsetPin;
    this.barElement.style.width = offsetPin;
  }

  public updateView(handler: Function): void {
    this.mouseEvent(handler);
    this.clickEvent(handler);
  }

  private mouseEvent(handler: Function): void {
    this.pinElement.addEventListener('mousedown', (evt) => {
      evt.preventDefault();

      let shiftX = evt.clientX - this.pinElement.getBoundingClientRect().left;
      let lineWidth = this.lineElement.offsetWidth - this.pinElement.offsetWidth;

      const onMouseMove = (evt: MouseEvent): void => {
        evt.preventDefault();
        let shiftPin: number = evt.clientX - this.lineElement.getBoundingClientRect().left - shiftX;
        if (shiftPin < 0) shiftPin = 0;
        if (shiftPin > lineWidth) shiftPin = lineWidth;

        handler(shiftPin, lineWidth);

        if (this.onChange) {
          this.onChange(this.inputValue);
        }
      }

      const onMouseUp = (): void => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (this.onFinish) {
          this.onFinish(this.inputValue);
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    this.pinElement.ondragstart = function () {
      return false;
    };
  }

  private clickEvent(handler: Function) {
    this.barElement.style.pointerEvents = 'none';

    this.lineElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      let lineWidth = this.lineElement.offsetWidth - this.pinElement.offsetWidth;
      let shiftPin: number = evt.clientX - this.lineElement.getBoundingClientRect().left - this.pinElement.offsetWidth / 2;

      if (shiftPin < 0) shiftPin = 0;
      if (shiftPin > lineWidth) shiftPin = lineWidth;

      handler(shiftPin, lineWidth);

      if (this.onChange) {
        this.onChange(this.inputValue);
      }

      if (this.onFinish) {
        this.onFinish(this.inputValue);
      }
    });
  }

  public changeSlider(settings: Settings) {
    const pinShift: number = (this.lineElement.offsetWidth - this.pinElement.offsetWidth) * (settings.value - settings.min) / (settings.max - settings.min) + this.pinElement.offsetWidth / 2;

    this.inputValue = settings.value;
    this.inputElement.value = this.inputValue;
    this.pinElement.style.setProperty('--input-value', `"${this.inputValue}"`);
    this.pinElement.style.left = pinShift + 'px';
    this.barElement.style.width = pinShift + 'px';
  }
};
