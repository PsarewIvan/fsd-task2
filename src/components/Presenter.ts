// Слой для обновления модели и отображения, который
// реагирует на сообщения о действиях пользователей и обновляет модель,
// реагирует на сообщения об обновлении модели и обновляет отображение
import SliderModel from './Model';
import View from './view/View';
import { Settings, SliderOrientation } from '../types';

export default class SliderPresenter {
  private model: SliderModel;
  private view: View;
  private element: HTMLElement;

  constructor(element: HTMLElement, options: Partial<Settings>) {
    this.element = element;
    this.model = new SliderModel(options);
    this.view = new View(this.element, this.model.getSettings());
    this.viewHandler(options);

    // Слушатель изменения значений в модели. При изменении значений
    // вызывает метод обновления View
    this.model.modelChangedSubject.subscribe(
      'viewUpdate',
      (settings: Settings) => {
        this.view.update(settings);
      }
    );

    this.model.modelChangedSubject.subscribe('changeOrientation', () => {
      this.view.destroyAll();
      const settings = this.model.getSettings();
      this.view = new View(this.element, settings);
      this.viewHandler(settings);
    });
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

  public changeStep(newStep: number): void {
    this.model.updateModel({ step: newStep });
  }

  public changeMin(value: number): void {
    this.model.updateModel({ min: value });
  }

  public changeMax(value: number): void {
    this.model.updateModel({ max: value });
  }

  public showScale(isScale: boolean): void {
    this.model.updateModel({ scale: isScale });
  }

  public changeOrientation(orientation: SliderOrientation): void {
    this.model.changeOrientation(orientation);
  }

  public showHint(isHint: boolean): void {
    this.model.updateModel({ hints: isHint });
  }

  public showTooltips(isTooltips: boolean): void {
    this.model.updateModel({ tooltips: isTooltips });
  }
}
