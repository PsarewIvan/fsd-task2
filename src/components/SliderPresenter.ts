// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import SliderModel from './SliderModel';
import SliderView from './SliderView';
import { Settings } from '../types';

export default class SliderPresenter {
  private model: SliderModel;
  private view: SliderView;
  private element: HTMLElement

  constructor(element: HTMLElement, options: Partial<Settings>) {
    this.element = element;
    this.model = new SliderModel(options);
    this.view = new SliderView(this.element, this.model.getSettings());
    this.view.viewChangedSubject.subscribe((data) => {
      this.model.setSettings(data);
    });
  }
};
