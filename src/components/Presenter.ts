// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import SliderModel from './Model';
import View from './view/View';
import { Settings, ThumbType } from '../types';

export default class SliderPresenter {
  private model: SliderModel;
  private view: View;
  private element: HTMLElement;

  constructor(element: HTMLElement, options: Partial<Settings>) {
    this.element = element;
    this.model = new SliderModel(options);
    this.view = new View(this.element, this.model.getSettings());

    // Подписываемся на изменения положения ползунков во View
    // и передаем изменения в Model для записи новых значений
    this.view.viewChanged(
      (thumbPercentOffset: number, index: number) => {
        this.model.setNewValue(thumbPercentOffset, index);
      },
      () => {
        if (options.onFinish) {
          options.onFinish(this.model.getSettings().values);
        }
      }
    );

    // Слушатель изменения значений в модели. При изменении значений
    // вызывает метод перемещения ползунков во View
    this.model.modelChangedSubject.subscribe(
      'viewUpdate',
      (settings: Settings) => {
        this.view.update(settings);
      }
    );
  }

  // Публичные методы взаимодействия со слайдером
  public getCurrentValue(): Array<number> {
    return this.model.getSettings().values;
  }

  public setValue(values: Array<number>): void {
    const currentValues = this.model.getSettings().values;
    currentValues.forEach((value, i) => {
      if (typeof values[i] === 'number' && value !== values[i]) {
        currentValues[i] = values[i];
      }
    });
    this.model.updateModel({ values: currentValues });
  }

  public onChange(handler: Function) {
    this.model.modelChangedSubject.subscribe('onChange', (values: number[]) => {
      if (handler) {
        handler(values);
      }
    });
  }

  public onLoad(handler: Function) {
    handler(this.model.getSettings().values);
  }

  public getState(): Settings {
    return this.model.getSettings();
  }
}
