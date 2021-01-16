// Слой управления данными, который содержит бизнес-логику

import { IModelSettings, IUserSettings } from './interfaces';

export default class Model {
  readonly defaults: IModelSettings;
  private settings: IModelSettings;

  constructor(options: IUserSettings) {
    this.defaults = {
      min: 0,
      max: 100,
      value: 50
    };
    this.setSettings(options);
  }

  public setSettings(newSettings: IUserSettings) {
    this.settings = {...this.defaults, ...newSettings};
  }

  public getSettings(): IModelSettings {
    return this.settings;
  }
};
