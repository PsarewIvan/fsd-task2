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
      scale: false,
      scaleMark: 4,
      subScaleMark: 5,
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
      scale: false,
      scaleMark: 4,
      subScaleMark: 5,
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

  // Записывает новые значения слайдера, объединяя новые значения
  // со старыми
  public setSettings(
    newSettings: Partial<Settings>,
    oldSettings: Settings = this.settings
  ): void {
    this.settings = { ...oldSettings, ...newSettings };
    this.modelChangedSubject.notify(this.getSettings());
  }

  // Возвращает значения с дополнительными полями, требуемыми для
  // корректной работы View:
  // settings.percents - массив значений в процентах
  // settings.values - массив значений
  public getSettings(): Settings {
    const upgradeSettings: Settings = { ...this.settings };
    const range: number = this.settings.max - this.settings.min;
    if (this.settings.type === 'single') {
      upgradeSettings.percents = [
        (this.settings.value - this.settings.min) / range,
      ];
      upgradeSettings.values = [this.settings.value];
    } else if (this.settings.type === 'range') {
      upgradeSettings.percents = [
        (this.settings.from - this.settings.min) / range,
        (this.settings.to - this.settings.min) / range,
      ];
      upgradeSettings.values = [this.settings.from, this.settings.to];
    }
    return upgradeSettings;
  }

  // Устанавливает новые значения слайдера в зависимости от
  // смещения конкртеного ползунка в процентах
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

  // Возвращает новое корректное значения в зависимости от
  // установленного шага и смещения в процентах
  private calcValue(thumbPercentOffset: number): number {
    let step = this.settings.step;
    let value =
      this.settings.min +
      (this.settings.max - this.settings.min) * thumbPercentOffset;

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

  // Метод для округления неточных значений
  private round(
    number: number,
    digits = 0,
    base = Math.pow(10, digits)
  ): number {
    return Math.round(base * number) / base;
  }
}
