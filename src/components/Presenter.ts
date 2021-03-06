// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import Model from './Model';
import View from './view/View';
import { Settings } from '../types';

class SliderPresenter {
  private model: Model;
  private view: View;
  private element: HTMLElement;

  constructor(element: HTMLElement, options: Partial<Settings>) {
    this.element = element;
    this.model = new Model(options);
    this.view = new View(this.element, this.model.getSettings());
    this.viewHandler(options);
    this.modelHandler();
    this.modelHandlerOrientation();
  }

  // Подписываемся на изменения положения ползунков во View
  // и передаем изменения в Model для записи новых значений
  private viewHandler(options: Partial<Settings>): void {
    this.view.viewChange(
      (thumbPercentOffset: number, index: number) => {
        this.model.setNewValue(thumbPercentOffset, index);
      },
      () => {
        if (options.onFinish) {
          options.onFinish(this.model.getSettings().values);
        }
      }
    );
  }

  // Слушатель изменения значений в модели. При изменении значений
  // вызывает метод обновления View
  private modelHandler(): void {
    this.model.modelChangedSubject.subscribe(
      'viewUpdate',
      (settings: Settings) => {
        this.view.update(settings);
      }
    );
  }

  // Слушатель за изменением ориентации слайдера. При изменении
  // переписывает и перерисовывает вид слайдера
  private modelHandlerOrientation(): void {
    this.model.modelChangedSubject.subscribe('changeOrientation', () => {
      this.view.destroyAll();
      const settings = this.model.getSettings();
      this.view = new View(this.element, settings);
      this.viewHandler(settings);
    });
  }

  // Публичные методы взаимодействия со слайдером
  public onChange(handler: Function) {
    this.model.modelChangedSubject.subscribe('onChange', (state: Settings) => {
      if (handler) {
        handler(state);
      }
    });
  }

  public onLoad(handler: Function) {
    if (handler) {
      handler(this.model.getSettings());
    }
  }

  public getState(): Settings {
    return this.model.getSettings();
  }

  public update(state: Partial<Settings>): void {
    this.model.updateModel(state);
  }
}

export default SliderPresenter;
