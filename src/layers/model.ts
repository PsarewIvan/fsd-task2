// Слой управления данными, который содержит бизнес-логику

import MakeObservableSubject from './makeObservableSubject';

export default class Model {
  private defaults: Object
  private settings: ISettings
  public modelChangedSubject: IObserver

  constructor(options: Object) {
    this.defaults = {
      min: 0,
      max: 100,
      value: 50
    };
    this.settings = Object.assign(this.defaults, options);
    this.modelChangedSubject = new MakeObservableSubject();
  }

  public getSettings(): Object {
    return this.settings;
  }
};
