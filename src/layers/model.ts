// Слой управления данными, который содержит бизнес-логику

import MakeObservableSubject from './makeObservableSubject';
import { IModelSettings, IUserSettings } from './interfaces';

export default class Model {
  readonly defaults: IModelSettings;
  private settings: IModelSettings;
  public modelChangedSubject: MakeObservableSubject;

  constructor(options: IUserSettings) {
    this.defaults = {
      min: 0,
      max: 100,
      value: 50
    };
    this.modelChangedSubject = new MakeObservableSubject();
    this.setSettings(options);
  }

  public setSettings(newSettings: IUserSettings) {
    // эта штука безопасно копирует объекты
    // при условии что там нет методов
    this.settings = Object.assign(JSON.parse(JSON.stringify(this.defaults)), JSON.parse(JSON.stringify(newSettings)));
    this.modelChangedSubject.notify();
  }

  public getSettings(): IModelSettings {
    return this.settings;
  }
};
