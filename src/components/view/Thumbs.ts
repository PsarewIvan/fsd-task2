import SliderElement from './SliderElement';
import { ExpandedState } from '../../types';

export default class ThumbView {
  private state: ExpandedState;
  private single?: SliderElement;
  private from?: SliderElement;
  private to?: SliderElement;

  constructor(rootNode: HTMLElement, state: ExpandedState) {
    this.state = state;
    this.render(rootNode);
  }

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

  public update(percents: Array<number>, values: Array<number>): void {
    this.updateDimensions(percents);
    this.updateHints(values);
  }

  public updateDimensions(percents: Array<number>): void {
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

  public updateHints(values: Array<number>): void {
    if (this.state.type === 'range') {
      this.from.root.style.setProperty('--from-input-value', `"${values[0]}"`);
      this.to.root.style.setProperty('--to-input-value', `"${values[1]}"`);
    } else if (this.state.type === 'single') {
      this.single.root.style.setProperty('--input-value', `"${values[0]}"`);
    }
  }

  public mouseEvent(handler: Function): void {
    if (this.state.type === 'range') {
      this.mouseListener(this.from.root, handler);
      this.mouseListener(this.to.root, handler);
    } else {
      this.mouseListener(this.single.root, handler);
    }
  }

  private mouseListener(currentThumb: HTMLElement, handler: Function): void {
    currentThumb.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
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
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    currentThumb.ondragstart = function () {
      return false;
    };
  }

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

  public clickToTrackListener(
    thumbType: string,
    evt: MouseEvent,
    handler: Function
  ): void {
    let clickOffset: number;
    let currentThumb: HTMLElement;
    if (thumbType === 'single') currentThumb = this.single.root;
    if (thumbType === 'from') currentThumb = this.from.root;
    if (thumbType === 'to') currentThumb = this.to.root;
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
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  public requiredThumb(clickOffset: number): string {
    let requiredThumb: string;
    if (this.state.type === 'single') {
      requiredThumb = 'single';
    } else if (this.state.type === 'range') {
      const range: number =
        this.getDistance(this.to.root) - this.getDistance(this.from.root);
      if (clickOffset <= this.getDistance(this.from.root) + range / 2) {
        requiredThumb = 'from';
      } else {
        requiredThumb = 'to';
      }
    }
    return requiredThumb;
  }

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
