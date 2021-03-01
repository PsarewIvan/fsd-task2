// Слой управления данными, который содержит бизнес-логику

import { Settings, SliderOrientation } from '../types';
import MakeObservableSubject from './makeObservableSubject';
import _ from 'lodash';

export default class SliderModel {
  readonly defaultParamSingle: Settings;
  readonly defaultParamRange: Settings;
  private settings: Settings;
  public modelChangedSubject: MakeObservableSubject;

  constructor(options: Partial<Settings>) {
    this.modelChangedSubject = new MakeObservableSubject();
    let defaultParam: Settings = {
      min: 0,
      max: 100,
      step: 1,
      orientation: 'horizontal',
      tooltips: true,
      scale: false,
      hints: true,
      scaleMark: 4,
      subScaleMark: 5,
      percents: [],
    };

    if (options.type === 'range') {
      defaultParam = {
        ...defaultParam,
        ...{
          values: [10, 90],
          type: 'range',
        },
      };
    } else {
      defaultParam = {
        ...defaultParam,
        ...{
          values: [50],
          type: 'single',
        },
      };
    }

    // Тут нужны дополнительные проверки входных данных
    options.values.forEach((value: number, i: number): void => {
      if (value < options.min) options.values[i] = options.min;
      if (value > options.max) options.values[i] = options.max;
    });
    this.setSettings(options, defaultParam);
  }

  // Производит проверки перед обновлением модели
  public updateModel(newSettings: Partial<Settings>) {
    if (newSettings.values) this.updateValues(newSettings.values);
    if (typeof newSettings.step === 'number') this.updateStep(newSettings.step);
    if (typeof newSettings.min === 'number') this.updateMin(newSettings.min);
    if (typeof newSettings.max === 'number') this.updateMax(newSettings.max);
    if (typeof newSettings.scale === 'boolean') {
      this.setSettings({ scale: newSettings.scale });
    }
    if (
      newSettings.orientation === 'horizontal' ||
      newSettings.orientation === 'vertical'
    ) {
      this.setSettings({ orientation: newSettings.orientation });
    }
    if (
      typeof newSettings.hints === 'boolean' &&
      newSettings.hints !== this.settings.hints
    ) {
      this.setSettings({ hints: newSettings.hints });
    }
  }

  public changeOrientation(orientation: SliderOrientation): void {
    if (
      (orientation === 'horizontal' || orientation === 'vertical') &&
      orientation !== this.settings.orientation
    ) {
      this.setSettings({ orientation: orientation });
      this.modelChangedSubject.notify('changeOrientation');
    }
  }

  // Проверяет и и вызывает метод записи новых значений слайдера
  private updateValues(values: number[]): void {
    const sortValues = values.slice().sort((a, b) => a - b);
    const isValuesEqual = this.isEqual(values, sortValues);
    const isValuesUpdate = !this.isEqual(values, this.settings.values);
    const isValuesInRange: boolean = !values.some((value) => {
      return value < this.settings.min || value > this.settings.max;
    });
    if (isValuesEqual && isValuesUpdate && isValuesInRange) {
      this.setSettings({ values: values });
      this.modelChangedSubject.notify('onChange', this.getSettings());
    }
  }

  private updateStep(step: number): void {
    if (step < 0) step = 0;
    if (step > this.settings.max - this.settings.min) {
      step = this.settings.max - this.settings.min;
    }
    this.setSettings({ step: step });
  }

  private updateMin(value: number): void {
    if (value >= this.settings.values[0]) {
      value = this.settings.values[0];
    }
    this.setSettings({ min: value });
  }

  private updateMax(value: number): void {
    if (value <= this.settings.values[this.settings.values.length - 1]) {
      value = this.settings.values[this.settings.values.length - 1];
    }
    this.setSettings({ max: value });
  }

  // Записывает новые значения слайдера, объединяя новые значения
  // со старыми
  private setSettings(
    newSettings: Partial<Settings>,
    oldSettings: Settings = this.settings
  ): void {
    this.settings = { ...oldSettings, ...newSettings };
    this.modelChangedSubject.notify('viewUpdate', this.getSettings());
  }

  // Возвращает значения с дополнительными полями, требуемыми для
  // корректной работы View:
  // settings.percents - массив значений в процентах
  public getSettings(): Settings {
    const upgradeSettings: Settings = _.cloneDeep(this.settings);
    const range: number = this.settings.max - this.settings.min;
    this.settings.values.forEach((value: number, i: number) => {
      upgradeSettings.percents[i] = (value - this.settings.min) / range;
    });
    return upgradeSettings;
  }

  // Устанавливает новые значения слайдера в зависимости от
  // смещения конкртеного ползунка в процентах
  public setNewValue(thumbPercentOffset: number, index: number): void {
    const calcValue = this.calcValue(thumbPercentOffset);
    if (this.settings.type === 'single') {
      this.updateModel({ values: [calcValue] });
    } else {
      const newValues = this.arrCopy(this.settings.values);
      newValues[index] = calcValue;
      this.updateModel({ values: newValues });
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

  private isEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length || arr1.join() !== arr2.join())
      return false;
    return true;
  }

  private arrCopy(arr: number[]): number[] {
    const newArr = [];
    arr.forEach((value: number, i: number) => {
      newArr[i] = value;
    });
    return newArr;
  }
}
