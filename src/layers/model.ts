// Слой управления данными, который содержит бизнес-логику

import MakeObservableSubject from './makeObservableSubject';

export default class Model {
  private defaults: Object
  private settings: Object
  public modelChangedSubject: MakeObservableSubject

  constructor(options: Object) {
    this.defaults = {
      min: 0,
      max: 100,
      value: 50
    };
    this.modelChangedSubject = new MakeObservableSubject();
    this.setSettings(options);
  }

  public setSettings(newSettings: Object) {
    // эта штука безопасно копирует объекты
    // при условии что там нет методов
    this.settings = Object.assign(JSON.parse(JSON.stringify(this.defaults)), JSON.parse(JSON.stringify(newSettings)));
    this.modelChangedSubject.notify();
  }

  public getSettings(): Object {
    return this.settings;
  }
};
