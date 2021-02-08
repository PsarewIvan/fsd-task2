import SliderElement from './SliderElement';
import { ExpandedState, RequiredThumb } from '../../types';

export default class ThumbView {
  private state: ExpandedState;
  private single?: SliderElement;
  private from?: SliderElement;
  private to?: SliderElement;

  constructor(rootNode: HTMLElement, state: ExpandedState) {
    this.state = state;
    this.render(rootNode);
  }

  // Отрисовывает необходимые ползунки в родительском элементе
  private render(rootNode: HTMLElement): void {
    if (this.state.type === 'range') {
      this.from = new SliderElement(rootNode, [
        'free-slider__thumb',
        'free-slider__thumb--from',
      ]);
      this.to = new SliderElement(rootNode, [
        'free-slider__thumb',
        'free-slider__thumb--to',
      ]);
    } else {
      this.single = new SliderElement(rootNode, ['free-slider__thumb']);
    }
  }

  // Обновляет состояние ползунков
  public update(percents: Array<number>, values: Array<number>): void {
    this.updatePosition(percents);
    if (this.state.isHints) {
      this.updateHints(values);
    }
  }

  // Обновляет местоположение ползунков на слайдере
  public updatePosition(percents: Array<number>): void {
    const shift = this.getThumbSize() / 2;
    if (this.state.orientation === 'vertical') {
      if (this.state.type === 'range') {
        this.from.root.style.top = `calc(${percents[0] * 100}% + ${shift}px)`;
        this.to.root.style.top = `calc(${percents[1] * 100}% + ${shift}px)`;
      } else {
        this.single.root.style.top = `calc(${percents[0] * 100}% + ${shift}px)`;
      }
    } else if (this.state.orientation === 'horizontal') {
      if (this.state.type === 'range') {
        this.from.root.style.left = `calc(${percents[0] * 100}% + ${shift}px)`;
        this.to.root.style.left = `calc(${percents[1] * 100}% + ${shift}px)`;
      } else {
        this.single.root.style.left = `calc(${
          percents[0] * 100
        }% + ${shift}px)`;
      }
    }
  }

  // Обновляет числовое значение над ползунком
  public updateHints(values: Array<number>): void {
    if (this.state.type === 'range') {
      this.from.root.style.setProperty('--from-input-value', `"${values[0]}"`);
      this.to.root.style.setProperty('--to-input-value', `"${values[1]}"`);
    } else if (this.state.type === 'single') {
      this.single.root.style.setProperty('--input-value', `"${values[0]}"`);
    }
  }

  // Возвращает ширину или высоту ползунков
  // в зависимости от ориентации слайдера
  public getThumbSize(): number {
    let thumbDiameter: number;
    if (this.state.orientation === 'horizontal') {
      if (this.state.type === 'single') {
        thumbDiameter = this.single.root.offsetWidth;
      } else if (this.state.type === 'range') {
        thumbDiameter = this.from.root.offsetWidth;
      }
    } else if (this.state.orientation === 'vertical') {
      if (this.state.type === 'single') {
        thumbDiameter = this.single.root.offsetHeight;
      } else if (this.state.type === 'range') {
        thumbDiameter = this.from.root.offsetHeight;
      }
    }
    return thumbDiameter;
  }

  // Создает слушателей на ползунках для обработки событий
  // работы пользователя
  public addMouseListener(handler: Function, onFinish: Function): void {
    if (this.state.type === 'range') {
      this.mouseListener(this.from.root, handler, onFinish);
      this.mouseListener(this.to.root, handler, onFinish);
    } else {
      this.mouseListener(this.single.root, handler, onFinish);
    }
  }

  // Слушатель для обработки пользовательских событий
  // при клике на ползунок и его движении
  private mouseListener(
    currentThumb: HTMLElement,
    handler: Function,
    onFinish: Function
  ): void {
    currentThumb.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this.mouseMoveEvent(currentThumb, evt, handler, onFinish);
    });

    currentThumb.ondragstart = function () {
      return false;
    };
  }

  // Метод считывает движения пользователя при движении ползунков
  public mouseMoveEvent(
    currentThumb: HTMLElement,
    evt: MouseEvent,
    handler: Function,
    onFinish: Function
  ): void {
    let clickOffset: number;
    if (this.state.orientation === 'vertical') {
      clickOffset = evt.clientY - currentThumb.getBoundingClientRect().top;
    } else if (this.state.orientation === 'horizontal') {
      clickOffset = evt.clientX - currentThumb.getBoundingClientRect().left;
    }

    const onMouseMove = (evt: MouseEvent): void => {
      evt.preventDefault();
      this.updateThumbsShift(evt, currentThumb, clickOffset, handler);
    };

    const onMouseUp = (): void => {
      onFinish();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Вызывает переданный обработчик с параметрами движения ползунков
  private updateThumbsShift(
    evt: MouseEvent,
    currentThumb: HTMLElement,
    clickOffset: number,
    handler: Function
  ): void {
    let thumbShift: number;
    let type: string;

    if (this.state.orientation === 'vertical') {
      thumbShift = evt.clientY - clickOffset;
    }
    if (this.state.orientation === 'horizontal') {
      thumbShift = evt.clientX - clickOffset;
    }
    if (this.state.type === 'single') {
      type = 'single';
    }
    if (this.state.type === 'range') {
      if (currentThumb === this.from.root) {
        type = 'from';
      } else if (currentThumb === this.to.root) {
        type = 'to';
      }
    }
    handler(thumbShift, type);
  }

  // Возвращает объект с данными ползунка, который необходимо
  // подвинуть при клике на Track
  public requiredThumb(clickOffset: number): RequiredThumb {
    if (this.state.type === 'single') {
      return {
        name: 'single',
        root: this.single.root,
      };
    }
    if (this.state.type === 'range') {
      const range: number =
        this.getDistance(this.to.root) - this.getDistance(this.from.root);
      if (clickOffset <= this.getDistance(this.from.root) + range / 2) {
        return {
          name: 'from',
          root: this.from.root,
        };
      } else {
        return {
          name: 'to',
          root: this.to.root,
        };
      }
    }
  }

  // Вспомогательный метод, возвращает значение от ползунка
  // до края экрана
  private getDistance(elem: HTMLElement): number {
    let distanceToScreen: number;
    if (this.state.orientation === 'horizontal') {
      distanceToScreen = elem.getBoundingClientRect().left;
    } else if (this.state.orientation === 'vertical') {
      distanceToScreen = elem.getBoundingClientRect().top;
    }
    return distanceToScreen;
  }
}
