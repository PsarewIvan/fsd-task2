// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import Model from './model';
import View from './view';
import { Settings } from './interfaces';

export default class SliderPresenter {
  private model: Model;
  private view: View;
  private element: HTMLElement

  constructor(element: JQuery, options: Partial<Settings>) {
    this.element = element[0];
    this.init(options);
  }

  private init(options: Partial<Settings>) {
    this.model = new Model(options);
    this.view = new View(this.element, this.model.getSettings());
    this.view.viewChangedSubject.subscribe( (data) => {
      this.model.setSettings(data);
    });
  }
};