// Слой управления данными, который содержит бизнес-логику

import { Settings } from '../types';

export default class Model {
  readonly defaults: Settings;
  private settings: Settings;

  constructor(options: Partial<Settings>) {
    this.defaults = {
      min: 0,
      max: 100,
      value: 50
    };
    this.setSettings(options);
  }

  public setSettings(newSettings: Partial<Settings>) {
    this.settings = {...this.defaults, ...newSettings};
  }

  public getSettings(): Settings {
    return this.settings;
  }
};
