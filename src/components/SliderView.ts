// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings } from '../types';
import MakeObservableSubject from './makeObservableSubject';

export default class SliderView {
  private html: string;
  private slider: HTMLElement;
  private inputElement: HTMLElement;
  private barElement: HTMLElement;
  private pinElement: HTMLElement;
  private lineElement: HTMLElement;
  private minElement: HTMLElement;
  private maxElement: HTMLElement;
  private onChange: Function;
  private onFinish: Function;
  public viewChangedSubject: MakeObservableSubject;
  public inputValue: number;

  constructor(element: HTMLElement, settings: Settings) {
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
    this.viewChangedSubject = new MakeObservableSubject();
    this.onChange = settings.onChange;
    this.onFinish = settings.onFinish;
    this.init(element, settings);
  }

  private addElements(): void {
    this.inputElement.insertAdjacentHTML('afterend', this.html);
  }

  public drawSlider(settings: Settings): void {
    this.minElement.innerHTML = `${settings.min}`;
    this.maxElement.innerHTML = `${settings.max}`;

    const offsetPin: string = `${(settings.value - settings.min) * (this.lineElement.offsetWidth - this.pinElement.offsetWidth) / (settings.max - settings.min) + this.pinElement.offsetWidth / 2}px`;
    this.pinElement.style.left = offsetPin;
    this.barElement.style.width = offsetPin;
  }

  private changePinOnMove(settings: Settings): void {
    this.pinElement.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      let shiftX = evt.clientX - this.pinElement.getBoundingClientRect().left;

      const onMouseMove = (moveEvt: MouseEvent): void => {
        moveEvt.preventDefault();

        let pinCords = moveEvt.clientX - shiftX - this.lineElement.getBoundingClientRect().left + this.pinElement.offsetWidth / 2;

        if (pinCords < this.pinElement.offsetWidth / 2) {
          pinCords = this.pinElement.offsetWidth / 2;
        }

        let rightEdge = this.lineElement.offsetWidth - this.pinElement.offsetWidth / 2;

        if (pinCords > rightEdge) {
          pinCords = rightEdge;
        }

        this.setInputValue(pinCords, settings);
        this.changeSliderElement(pinCords);

        if (this.onChange) {
          this.onChange(this.inputValue);
        }
      }

      const onMouseUp = (): void => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        this.viewChangedSubject.notify({
          value: this.inputValue
        });

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

  private changePinOnClick(settings: Settings): void {
    this.barElement.style.pointerEvents = 'none';

    this.lineElement.addEventListener('click', (clickEvt) => {
      clickEvt.preventDefault();

      let pinShift: number = clickEvt.clientX - this.lineElement.getBoundingClientRect().left;

      if (pinShift < this.pinElement.offsetWidth / 2) {
        pinShift = this.pinElement.offsetWidth / 2;
      }

      if (pinShift > this.lineElement.offsetWidth - this.pinElement.offsetWidth / 2) {
        pinShift = this.lineElement.offsetWidth - this.pinElement.offsetWidth / 2;
      }

      this.setInputValue(pinShift, settings);
      this.changeSliderElement(pinShift);

      this.viewChangedSubject.notify({
        value: this.inputValue
      });

      if (this.onChange) {
        this.onChange(this.inputValue);
      }

      if (this.onFinish) {
        this.onFinish(this.inputValue);
      }
    });
  }

  private changeSliderElement(cords: number): void {
    this.pinElement.style.left = cords + 'px';
    this.barElement.style.width = cords + 'px';
  }

  private getInputValue(settings: Settings, pinCords: number): number {
    return Math.floor( (settings.max - settings.min) * (pinCords - this.pinElement.offsetWidth / 2) / (this.lineElement.offsetWidth - this.pinElement.offsetWidth) + settings.min );
  }

  private setInputValue(value: number, settings: Settings): void {
    this.inputValue = this.getInputValue(settings, value);
    this.inputElement.value = this.inputValue;
    this.pinElement.style.setProperty('--input-value', `"${this.inputValue}"`);
  }

  private init(element: HTMLElement, settings: Settings): void {
    this.slider = element;
    this.slider.innerHTML = this.html;
    this.inputElement = this.slider.querySelector('.free-slider__input');
    this.barElement = this.slider.querySelector('.free-slider__bar');
    this.pinElement = this.slider.querySelector('.free-slider__handle');
    this.lineElement = this.slider.querySelector('.free-slider__line');
    this.minElement = this.slider.querySelector('.free-slider__min');
    this.maxElement = this.slider.querySelector('.free-slider__max');

    this.inputValue = settings.value;
    this.inputElement.value = settings.value;
    this.pinElement.style.setProperty('--input-value', `"${settings.value}"`);

    this.drawSlider(settings);
    this.changePinOnMove(settings);
    this.changePinOnClick(settings);
  }
};
