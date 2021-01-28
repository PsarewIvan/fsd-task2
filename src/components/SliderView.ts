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
  private orientation: string | undefined;
  private isFirstChange: boolean;
  private inputValue: Array<number>;

  constructor(rootNode: HTMLElement, settings: Settings) {
    this.onChange = settings.onChange;
    this.onFinish = settings.onFinish;
    this.type = settings.type;
    this.orientation = settings.orientation;
    this.isFirstChange = true;

    this.render(rootNode);
    this.initSliderElement();
    this.updateMinMax(settings.min, settings.max);
    this.changeSlider(settings);
  }

  public updateView(handler: Function): void {
    this.clickOnBarListener(handler);

    if (this.type === 'range') {
      this.mouseEventRange(handler);
    } else {
      this.mouseEventSingle(handler);
    }
  }

  public changeSlider(settings: Settings) {
    this.inputValue = this.type === 'range' ? [settings.from, settings.to] : [settings.value];

    this.updateInput();
    if (this.orientation) {
      this.updatePinsVertical(settings);
    } else {
      this.updatePinsHoriz(settings);
    }

    if (this.onChange && !this.isFirstChange) {
      this.onChange(this.inputValue);
    }
    this.isFirstChange = false;
  }

  private updatePinsHoriz(settings: Settings): void {
    const getPinShift = (currentPinElement: HTMLElement, value: number): number => {
      return (this.lineElement.offsetWidth - currentPinElement.offsetWidth) * (value - settings.min) / (settings.max - settings.min) + currentPinElement.offsetWidth / 2;
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

  private updatePinsVertical(settings: Settings): void {
    const getPinShift = (currentPinElement: HTMLElement, value: number): number => {
      return (this.lineElement.offsetHeight - currentPinElement.offsetHeight) * (value - settings.min) / (settings.max - settings.min) + currentPinElement.offsetHeight / 2;
    };

    if (this.type === 'range') {
      const fromPinShift: number = getPinShift(this.fromPinElement, settings.from);
      const toPinShift: number = getPinShift(this.toPinElement, settings.to);

      this.fromPinElement.style.top = `${fromPinShift}px`;
      this.toPinElement.style.top = `${toPinShift}px`;
      this.barElement.style.top = `${fromPinShift}px`;
      this.barElement.style.height = `${toPinShift - fromPinShift}px`;
    } else {
      const pinShift: number = getPinShift(this.pinElement, settings.value);

      this.pinElement.style.top = `${pinShift}px`;
      this.barElement.style.height = `${pinShift}px`;
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
        <span class="free-slider">
          ${baseHtml}
          <span class="free-slider__from-handle"></span>
          <span class="free-slider__to-handle"></span>
        </span>`;
    } else {
      this.html = `
        <span class="free-slider">
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
    if (this.orientation === 'vertical') {

      this.root.querySelector('.free-slider').classList.add('free-slider--vertical');
    }
  }

  private updateMinMax(min: number, max: number): void {
    this.minElement.innerHTML = `${min}`;
    this.maxElement.innerHTML = `${max}`;
  }

  private updateInput(): void {
    this.inputElement.value = this.inputValue.join('-');
    if (this.type === 'range') {
      this.fromPinElement.style.setProperty('--from-input-value', `"${this.inputValue[0]}"`)
      this.toPinElement.style.setProperty('--to-input-value', `"${this.inputValue[1]}"`)
    } else {
      this.pinElement.style.setProperty('--input-value', `"${this.inputValue[0]}"`);
    }
  }

  private mouseEventRange(handler: Function): void {
    this.pinMouseListener(this.fromPinElement, handler);
    this.pinMouseListener(this.toPinElement, handler);
  }

  private mouseEventSingle(handler: Function): void {
    this.pinMouseListener(this.pinElement, handler);
  }

  private pinMouseListener(currentPinElement: HTMLElement, handler: Function): void {
    currentPinElement.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this.handlingMouseMotionEvents(evt, currentPinElement, handler);
    });

    currentPinElement.ondragstart = function () {
      return false;
    };
  }

  private handlingMouseMotionEvents(evt: MouseEvent, currentPin: HTMLElement, handler: Function,): void {
    let clickOffset: number;
    let lineSize: number;

    if (this.orientation === 'vertical') {
      clickOffset = evt.clientY - currentPin.getBoundingClientRect().top;
      lineSize = this.getLineHeight();
    } else {
      clickOffset = evt.clientX - currentPin.getBoundingClientRect().left;
      lineSize = this.getLineWidth();
    }

    const onMouseMove = (evt: MouseEvent): void => {
      evt.preventDefault();
      let shiftPin: number;
      if (this.orientation === 'vertical') {
        shiftPin = evt.clientY - this.lineElement.getBoundingClientRect().top - clickOffset;
      } else {
        shiftPin = evt.clientX - this.lineElement.getBoundingClientRect().left - clickOffset;
      }
      if (shiftPin < 0) shiftPin = 0;
      if (shiftPin > lineSize) shiftPin = lineSize;

      handler(shiftPin, lineSize, this.getPinType(currentPin));
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
  }

  private clickOnBarListener(handler: Function): void {
    this.barElement.style.pointerEvents = 'none';
    this.lineElement.addEventListener('mousedown', (evt) => {
      evt.preventDefault();

      this.changePinOnClick(evt, handler);

      if (this.type === 'range') {
        const range: number = this.getRangeBetweenPins();
        if (this.isClickRefersToTheFromPin(evt, range)) {
          this.handlingMouseMotionEvents(evt, this.fromPinElement, handler);
        } else {
          this.handlingMouseMotionEvents(evt, this.toPinElement, handler);
        }
      } else {
        this.handlingMouseMotionEvents(evt, this.pinElement, handler);
      }
    });

    this.lineElement.ondragstart = function () {
      return false;
    };
  }

  private changePinOnClick(evt: MouseEvent, handler: Function): void {
    let pinShift: number = this.getPinShift(evt);
    let lineSize: number;

    if (this.orientation === 'vertical') {
      lineSize = this.getLineHeight();
    } else {
      lineSize = this.getLineWidth();
    }

    if (pinShift < 0) pinShift = 0;
    if (pinShift > lineSize) pinShift = lineSize;

    if (this.type === 'range') {
      const range: number = this.getRangeBetweenPins();

      if (this.isClickRefersToTheFromPin(evt, range)) {
        handler(pinShift, lineSize, 'from');
      } else {
        handler(pinShift, lineSize, 'to');
      }
    } else {
      handler(pinShift, lineSize, 'single');
    }
  }

  private getLineWidth(): number {
    if (this.type === 'range') {
      return this.lineElement.offsetWidth - this.fromPinElement.offsetWidth / 2 - this.toPinElement.offsetWidth / 2;
    } else {
      return this.lineElement.offsetWidth - this.pinElement.offsetWidth;
    }
  }

  private getLineHeight(): number {
    if (this.type === 'range') {
      return this.lineElement.offsetHeight - this.fromPinElement.offsetHeight / 2 - this.toPinElement.offsetHeight / 2;
    } else {
      return this.lineElement.offsetHeight - this.pinElement.offsetHeight;
    }
  }

  private getPinShift(evt: MouseEvent): number {
    let pinShift: number;
    if (this.orientation === 'vertical') {
      if (this.type === 'range') {
        pinShift = evt.clientY - this.lineElement.getBoundingClientRect().top - this.fromPinElement.offsetHeight / 2;
      } else {
        pinShift = evt.clientY - this.lineElement.getBoundingClientRect().top - this.pinElement.offsetHeight / 2;
      }
    } else {
      if (this.type === 'range') {
        pinShift = evt.clientX - this.lineElement.getBoundingClientRect().left - this.fromPinElement.offsetWidth / 2;
      } else {
        pinShift = evt.clientX - this.lineElement.getBoundingClientRect().left - this.pinElement.offsetWidth / 2;
      }
    }
    return pinShift;
  }

  private getPinType(currentPin: HTMLElement): string {
    let pinType: string;
    switch (currentPin) {
      case this.fromPinElement:
        pinType = 'from';
        break;
      case this.toPinElement:
        pinType = 'to';
        break;
      default:
        pinType = 'single';
    }
    return pinType;
  }

  private getRangeBetweenPins(): number {
    let range: number;
    if (this.orientation === 'vertical') {
      range = this.toPinElement.getBoundingClientRect().top - this.fromPinElement.getBoundingClientRect().top;
    } else {
      range = this.toPinElement.getBoundingClientRect().left - this.fromPinElement.getBoundingClientRect().left;
    }
    return range;
  }

  private isClickRefersToTheFromPin(evt: MouseEvent, sliderRange: number): boolean {
    if (this.orientation === 'vertical') {
      return evt.clientY <= this.fromPinElement.getBoundingClientRect().top + sliderRange / 2;
    } else {
      return evt.clientX <= this.fromPinElement.getBoundingClientRect().left + sliderRange / 2;
    }
  }
};
