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
      step: 1,
      type: 'single',
      orientation: 'horizontal',
      tooltips: true,
    };
    this.defaultParamRange = {
      min: 0,
      max: 100,
      from: 10,
      to: 90,
      step: 1,
      type: 'range',
      orientation: 'horizontal',
      tooltips: true,
    };

    // Очень хрупко, нужны дополнительные проверки
    const isRangeType = options && options.type === 'range';
    const isEmptyType =
      options && !options.hasOwnProperty('type') && options.from && options.to;
    if (isRangeType || isEmptyType) {
      if (options.from > options.to) {
        [options.min, options.max] = [options.max, options.min];
      }
      this.setSettings(options, this.defaultParamRange);
    } else {
      this.setSettings(options, this.defaultParamSingle);
    }
  }

  public on(handler: Function) {
    handler();
  }

  public setSettings(
    newSettings: Partial<Settings>,
    oldSettings: Settings = this.settings
  ): void {
    this.settings = { ...oldSettings, ...newSettings };
    this.modelChangedSubject.notify(this.settings);
  }

  public getSettings(): Settings {
    const upgradeSettings: Settings = { ...this.settings };
    if (this.settings.type === 'single') {
      upgradeSettings.values = [this.settings.value];
    } else if (this.settings.type === 'range') {
      upgradeSettings.values = [this.settings.from, this.settings.to];
    }
    return upgradeSettings;
  }

  public setNewValue(thumbPercentOffset: number, thumbName: string): void {
    const value = this.calcValue(thumbPercentOffset);
    if (thumbName === 'single' && value !== this.settings.value) {
      this.setSettings({ value: value });
    } else if (
      thumbName === 'to' &&
      value !== this.settings.to &&
      value >= this.settings.from
    ) {
      this.setSettings({ to: value });
    } else if (
      thumbName === 'from' &&
      value !== this.settings.from &&
      value <= this.settings.to
    ) {
      this.setSettings({ from: value });
    }
  }

  private calcValue(thumbShift: number): number {
    let step = this.settings.step;
    let value =
      this.settings.min + (this.settings.max - this.settings.min) * thumbShift;

    if (
      value % step > step / 2 &&
      value !== this.settings.max &&
      value !== this.settings.min
    )
      value = value + step - (value % step);
    if (
      value % step < step / 2 &&
      value !== this.settings.max &&
      value !== this.settings.min
    )
      value = value - (value % step);

    value = this.round(value, 5);
    return value;
  }

  private round(
    number: number,
    digits = 0,
    base = Math.pow(10, digits)
  ): number {
    return Math.round(base * number) / base;
  }
}
