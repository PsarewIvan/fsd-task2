// Слой управления данными, который содержит бизнес-логику

import { Settings } from '../types';
import MakeObservableSubject from './makeObservableSubject';

export default class SliderModel {
  readonly defaults: Settings;
  private settings: Settings;
  public modelChangedSubject: MakeObservableSubject;

  constructor(options: Partial<Settings>) {
    this.modelChangedSubject = new MakeObservableSubject();
    this.defaults = {
      min: 0,
      max: 100,
      value: 50,
      step: 1
    };
    this.setSettings(options, this.defaults);
  }

  public setSettings(newSettings: Partial<Settings>, oldSettings: Settings = this.settings) {
    this.settings = {...oldSettings, ...newSettings};
    this.modelChangedSubject.notify(this.settings);
  }

  public getSettings(): Settings {
    return this.settings;
  }

  public setNewValue(pinShift: number, sliderWidth: number) {
    let step = this.settings.step;
    let value = pinShift / sliderWidth * (this.settings.max - this.settings.min) + this.settings.min;

    if (value % step >= step / 2 && value !== this.settings.max) value = value + step - (value % step);
    if (value % step < step / 2 && value !== this.settings.max) value = value - (value % step);
    if (value === this.settings.max) value = this.settings.max;
    value = this.round(value, 5);

    if (value !== this.settings.value) {
      this.setSettings({ value: value });
    }

  }

  private round(number: number, digits = 0, base = Math.pow(10, digits)): number {
    return Math.round(base * number) / base;
  };
};
