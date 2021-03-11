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
    const defaultParameter = this.getDefaultParameter(options);
    if (options) {
      const newOptions = { ...defaultParameter, ...options };
      this.optionsCheck(newOptions);
      this.setSettings(newOptions, defaultParameter);
    } else {
      this.setSettings(defaultParameter);
    }
  }

  // Производит проверки перед обновлением модели
  public updateModel(newSettings: Partial<Settings>): void {
    if (newSettings.values) this.updateValues(newSettings.values);
    if (typeof newSettings.step === 'number') this.updateStep(newSettings.step);
    if (typeof newSettings.min === 'number') this.updateMin(newSettings.min);
    if (typeof newSettings.max === 'number') this.updateMax(newSettings.max);
    if (typeof newSettings.scale === 'boolean') {
      this.setSettings({ scale: newSettings.scale });
    }
    if (
      typeof newSettings.hints === 'boolean' &&
      newSettings.hints !== this.settings.hints
    ) {
      this.setSettings({ hints: newSettings.hints });
    }
    if (
      typeof newSettings.tooltips === 'boolean' &&
      newSettings.tooltips !== this.settings.tooltips
    ) {
      this.setSettings({ tooltips: newSettings.tooltips });
    }
    this.changeOrientation(newSettings.orientation);
  }

  // Возвращает значения с дополнительными полями, требуемыми для
  // корректной работы View:
  // settings.percents - массив значений в процентах
  public getSettings(): Settings {
    const settingsClone: Settings = _.cloneDeep(this.settings);
    const range: number = settingsClone.max - settingsClone.min;
    settingsClone.values.forEach((value: number, i: number) => {
      settingsClone.percents[i] = (value - settingsClone.min) / range;
    });
    return settingsClone;
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

  private getDefaultParameter(options: Partial<Settings>): Settings {
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
      onChange: null,
      onFinish: null,
      onUpdate: null,
    };

    if (options && options.type === 'range') {
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
    return defaultParam;
  }

  // Проверяет изменились ли значения и вызывает метод записи
  // новых значений слайдера
  private updateValues(values: number[]): void {
    const updateValues = this.changeInputValues(values);
    const isValuesUpdate: boolean = !this.isEqual(
      updateValues,
      this.settings.values
    );
    if (isValuesUpdate) {
      this.setSettings({ values: updateValues });
      this.modelChangedSubject.notify('onChange', this.getSettings());
      this.onChangeCallback();
    }
  }

  // Изменяет новые значения, если они выходят из диапазона допустимых
  // значений
  private changeInputValues(values: number[]): number[] {
    const currentValues = this.getSettings().values;
    for (let i = 0; i < currentValues.length; i += 1) {
      if (typeof values[i] !== 'number') values[i] = currentValues[i];
      if (values[i] < this.settings.min) values[i] = this.settings.min;
      if (values[i] > this.settings.max) values[i] = this.settings.max;
    }
    const clone = _.cloneDeep(this.settings.values);
    const isChangeBoth = values[0] !== clone[0] && values[1] !== clone[1];
    const isChangeFirst = values[0] !== clone[0] && values[1] === clone[1];
    const isChangeSecond = values[0] === clone[0] && values[1] !== clone[1];
    const isFirstGreater = values[0] > clone[1];
    const isSecondLess = values[1] < clone[0];
    if (isChangeBoth) {
      values.sort((a, b) => a - b);
    }
    if (isChangeFirst && isFirstGreater) {
      values[0] = clone[1];
    }
    if (isChangeSecond && isSecondLess) {
      values[1] = clone[0];
    }
    return values;
  }

  private updateStep(step: number): void {
    const range = this.settings.max - this.settings.min;
    if (step < 0) step = 1;
    if (step > range) step = range;
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

  private changeOrientation(orientation: SliderOrientation): void {
    const isInputValid =
      orientation === 'horizontal' || orientation === 'vertical';
    const isInputChange = orientation !== this.settings.orientation;
    if (isInputValid && isInputChange) {
      this.setSettings({ orientation: orientation });
      this.modelChangedSubject.notify('changeOrientation');
    }
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

  // Проверка новых значений и их перезапись в случае выхода из диапазона
  private optionsCheck(options: Partial<Settings>) {
    options.values.forEach((value: number, i: number): void => {
      if (value < options.min) options.values[i] = options.min;
      if (value > options.max) options.values[i] = options.max;
    });
  }

  // Возвращает новое корректное значения в зависимости от
  // установленного шага и смещения в процентах
  private calcValue(thumbPercentOffset: number): number {
    let step = this.settings.step;
    let value =
      this.settings.min +
      (this.settings.max - this.settings.min) * thumbPercentOffset;
    const isValueInRange =
      value < this.settings.max && value > this.settings.min;
    const isAddStep = value % step > step / 2;
    const isDeductStep = value % step < step / 2;
    if (isAddStep && isValueInRange) value = value + step - (value % step);
    if (isDeductStep && isValueInRange) value = value - (value % step);
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

  // Проверка равенства простых массивов
  private isEqual(arr1: number[], arr2: number[]): boolean {
    const isEqualLength = arr1.length !== arr2.length;
    const isSameInside = arr1.join() !== arr2.join();
    if (isEqualLength || isSameInside) return false;
    return true;
  }

  // Неглубокое копирование массивов
  private arrCopy(arr: number[]): number[] {
    const newArr = [];
    arr.forEach((value: number, i: number) => {
      newArr[i] = value;
    });
    return newArr;
  }

  private onChangeCallback(): void {
    if (typeof this.settings.onChange === 'function') {
      this.settings.onChange(_.cloneDeep(this.settings.values));
    }
  }
}
