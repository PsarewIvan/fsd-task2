// Слой управления данными, который содержит бизнес-логику

import { Settings } from '../types';
import MakeObservableSubject from './makeObservableSubject';

export default class SliderModel {
  readonly defaultParamSingle: Settings;
  readonly defaultParamRange: Settings;
  private settings: Settings;
  public modelChangedSubject: MakeObservableSubject;

  constructor(options: Partial<Settings>) {
    this.modelChangedSubject = new MakeObservableSubject();
    this.defaultParamSingle = {
      min: 0,
      max: 100,
      value: 50,
      step: 1
    };
    this.defaultParamRange = {
      min: 0,
      max: 100,
      from: 10,
      to: 90,
      step: 1
    }

    // Очень хрупко, нужны дополнительные провреки
    if (options && options.type === 'range') {
      this.setSettings(options, this.defaultParamRange);
    } else {
      this.setSettings(options, this.defaultParamSingle)
    }
  }

  public setSettings(newSettings: Partial<Settings>, oldSettings: Settings = this.settings): void {
    this.settings = {...oldSettings, ...newSettings};
    this.modelChangedSubject.notify(this.settings);
  }

  public getSettings(): Settings {
    return this.settings;
  }

  public setNewValue(pinShift: number, sliderWidth: number, pinType: string): void {
    const value = this.calcValue(pinShift, sliderWidth);
    if (pinType === 'single' && value !== this.settings.value) {
      this.setSettings({ value: value });
    } else if (pinType === 'to' && value !== this.settings.to && value >= this.settings.from) {
      this.setSettings({ to: value });
    } else if (pinType === 'from' && value !== this.settings.from && value <= this.settings.to) {
      this.setSettings({ from: value });
    }
  }

  private calcValue(pinShift: number, sliderWidth: number): number {
    let step = this.settings.step;
    let value = pinShift / sliderWidth * (this.settings.max - this.settings.min) + this.settings.min;

    if (value % step >= step / 2 && value !== this.settings.max) value = value + step - (value % step);
    if (value % step < step / 2 && value !== this.settings.max) value = value - (value % step);
    value = this.round(value, 5);
    return value;
  }

  private round(number: number, digits = 0, base = Math.pow(10, digits)): number {
    return Math.round(base * number) / base;
  };
};
