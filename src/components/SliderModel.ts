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
      value: 50
    };
    this.setSettings(options, this.defaults);
  }

  private setSettings(newSettings: Partial<Settings>, oldSettings: Settings = this.settings) {
    this.settings = {...oldSettings, ...newSettings};
    this.modelChangedSubject.notify(this.settings);
  }

  public getSettings(): Settings {
    return this.settings;
  }

  public setNewValue(pinShift: number, sliderWidth: number) {
    const value = Math.floor(pinShift / sliderWidth * (this.settings.max - this.settings.min)) + this.settings.min;
    this.setSettings({value: value});
  }
};
