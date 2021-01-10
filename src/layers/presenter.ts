// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import { ImportDeclaration } from 'estree';
import Model from './model';
import View from './view';

export default class SliderPresenter {
  private model: IModel;
  private view: IView;

  constructor(element, options) {
    this.element = element[0];
    this.defaults = {
      containerClass: 'new-class',
      url: ''
    };
    this.config = Object.assign(this.defaults, options);
    this.init();
  }

  private init() {
    this.model = new Model();
    this.view = new View(this.element, this.config);

    // проверка работы
    this.element.classList.add(this.defaults.containerClass);

  }
};
