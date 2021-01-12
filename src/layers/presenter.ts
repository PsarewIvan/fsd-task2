// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import Model from './model';
import View from './view';

export default class SliderPresenter {
  private model: IModel;
  private view: IView;
  private element: HTMLElement

  constructor(element: JQuery, options: Object) {
    this.element = element[0];
    this.init(options);
  }

  private init(options: Object) {
    this.model = new Model(options);
    this.view = new View(this.element, this.model.getSettings());
    this.model.modelChangedSubject.subscribe( () => {
      this.view.drawSlider( this.model.getSettings() );
    });
  }
};
