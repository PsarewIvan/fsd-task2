// Слой для управления отображением, который содержит логику,
// связанную с отображением, а также реагирует на взаимодействие
// пользователя с приложением

import { Settings } from '../types';

export default class SliderView {
  private html: string;
  private root: HTMLElement;
  private inputElement: HTMLInputElement;
  private barElement: HTMLElement;
  private pinElement: HTMLElement;
  private fromPinElement: HTMLElement;
  private toPinElement: HTMLElement;
  private lineElement: HTMLElement;
  private minElement: HTMLElement;
  private maxElement: HTMLElement;
  private onChange: Function | undefined;
  private onFinish: Function | undefined;
  private type: string | undefined;
  private isFirstChange: boolean;
  private inputValue: Array<number>;

  constructor(rootNode: HTMLElement, settings: Settings) {
    this.onChange = settings.onChange;
    this.onFinish = settings.onFinish;
    this.type = settings.type;
    this.isFirstChange = true;
    this.inputValue = settings.value ? [settings.value] : [settings.from, settings.to];

    this.render(rootNode);
    this.initSliderElement();
    this.updateMinMax(settings.min, settings.max);
    this.changeSlider(settings);
  }

  public updateView(handler: Function): void {
    this.mouseEvent(handler);
    this.clickEvent(handler);
  }

  public changeSlider(settings: Settings) {
    if (this.type === 'range') {
      this.inputValue = [settings.from, settings.to];
    } else {
      this.inputValue[0] = settings.value;
    }

    this.updateInputs();
    this.updatePins(settings);

    if (this.onChange && this.isFirstChange) {
      this.isFirstChange = false;
      this.onChange(this.inputValue);
    }
  }

  private updatePins(settings: Settings): void {
    const getPinShift = (pinElement: HTMLElement, value: number): number => {
      return (this.lineElement.offsetWidth - pinElement.offsetWidth) * (value - settings.min) / (settings.max - settings.min) + pinElement.offsetWidth / 2;
    };

    if (this.type === 'range') {
      const fromPinShift: number = getPinShift(this.fromPinElement, settings.from);
      const toPinShift: number = getPinShift(this.toPinElement, settings.to);
      this.fromPinElement.style.left = `${fromPinShift}px`;
      this.toPinElement.style.left = `${toPinShift}px`;
      this.barElement.style.left = `${fromPinShift}px`;
      this.barElement.style.width = `${toPinShift - fromPinShift}px`;
    } else {
      const pinShift: number = getPinShift(this.pinElement, settings.value);
      this.pinElement.style.left = `${pinShift}px`;
      this.barElement.style.width = `${pinShift}px`;
    }
  }

  private render(root: HTMLElement) {
    const baseHtml = `
      <input class="free-slider__input" type="text" name="free-slider">
      <span class="free-slider__model">
        <span class="free-slider__line"></span>
        <span class="free-slider__min">0</span>
        <span class="free-slider__max">100</span>
      </span>
      <span class="free-slider__bar"></span>`;
    if (this.type === 'range') {
      this.html = `
        <span class="free-slider__wrapper">
          ${baseHtml}
          <span class="free-slider__from-handle"></span>
          <span class="free-slider__to-handle"></span>
        </span>`;
    } else {
      this.html = `
        <span class="free-slider__wrapper">
          ${baseHtml}
          <span class="free-slider__handle"></span>
        </span>`;
    }
    this.root = root;
    this.root.innerHTML = this.html;
  }

  private initSliderElement() {
    this.inputElement = this.root.querySelector('.free-slider__input');
    this.barElement = this.root.querySelector('.free-slider__bar');
    this.lineElement = this.root.querySelector('.free-slider__line');
    this.minElement = this.root.querySelector('.free-slider__min');
    this.maxElement = this.root.querySelector('.free-slider__max');
    if (this.type === 'range') {
      this.fromPinElement = this.root.querySelector('.free-slider__from-handle');
      this.toPinElement = this.root.querySelector('.free-slider__to-handle');
    } else {
      this.pinElement = this.root.querySelector('.free-slider__handle');
    }
  }

  private updateMinMax(min: number, max: number): void {
    this.minElement.innerHTML = `${min}`;
    this.maxElement.innerHTML = `${max}`;
  }

  private updateInputs(): void {
    this.inputElement.value = this.inputValue.join('-');
    if (this.type === 'range') {
      this.fromPinElement.style.setProperty('--from-input-value', `"${this.inputValue[0]}"`)
      this.toPinElement.style.setProperty('--to-input-value', `"${this.inputValue[1]}"`)
    } else {
      this.pinElement.style.setProperty('--input-value', `"${this.inputValue[0]}"`);
    }
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

      if (this.onFinish) {
        this.onFinish(this.inputValue);
      }
    });
  }
};
