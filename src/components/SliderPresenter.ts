// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import SliderModel from './SliderModel';
import View from './view/View';
import { Settings } from '../types';

export default class SliderPresenter {
  private model: SliderModel;
  private view: View;
  private element: HTMLElement;

  constructor(element: HTMLElement, options: Partial<Settings>) {
    this.element = element;
    this.model = new SliderModel(options);
    this.view = new View(this.element, this.model.getSettings());

    this.view.viewChanged((thumbPercentOffset: number, thumbName: string) => {
      this.model.setNewValue(thumbPercentOffset, thumbName);
    });

    this.model.modelChangedSubject.subscribe((settings: Settings) => {
      // this.view.update(settings);
    });
  }

  public getCurrentValue(): number {
    return this.model.getSettings().value;
  }

  public setValue(value: number): void {
    this.model.setSettings({ value: value });
  }
}
