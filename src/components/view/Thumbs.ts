import SliderElement from './SliderElement';
import { EventValue, State, ExpandedState } from '../../types';

export default class ThumbView {
  private state: ExpandedState;
  private single?: SliderElement;
  private from?: SliderElement;
  private to?: SliderElement;
  private thumbsShift: Array<number>;

  constructor(
    rootNode: HTMLElement,
    values: Array<number>,
    state: ExpandedState
  ) {
    this.state = state;
    this.render(rootNode);
    this.updateDimensions(values);
    this.updateHints(values);
    this.mouseEvent();
  }

  public getThumbShift() {}

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

  private updateDimensions(values: Array<number>): void {
    if (this.state.orientation === 'vertical') {
      if (this.state.type === 'range') {
        this.from.root.style.top = `${values[0] * 100}%`;
        this.to.root.style.top = `${values[1] * 100}%`;
      } else {
        this.single.root.style.top = `${values[0] * 100}%`;
      }
    } else if (this.state.orientation === 'horizontal') {
      if (this.state.type === 'range') {
        this.from.root.style.left = `${values[0] * 100}%`;
        this.to.root.style.left = `${values[1] * 100}%`;
      } else {
        this.single.root.style.left = `${values[0] * 100}%`;
      }
    }
  }

  private updateHints(percentValues: Array<number>): void {
    const values = this.valuesFromPercent(percentValues);
    if (this.state.type === 'range') {
      this.from.root.style.setProperty('--from-input-value', `"${values[0]}"`);
      this.to.root.style.setProperty('--to-input-value', `"${values[1]}"`);
    } else if (this.state.type === 'single') {
      this.single.root.style.setProperty('--input-value', `"${values[0]}"`);
    }
  }

  private valuesFromPercent(percentValues: Array<number>): Array<number> {
    const values: Array<number> = [];
    percentValues.forEach((value) => {
      values.push((this.state.max - this.state.min) * value + this.state.min);
    });
    return values;
  }

  private mouseEvent(): void {
    if (this.state.type === 'range') {
      this.mouseListener(this.from.root);
      this.mouseListener(this.to.root);
    } else {
      this.mouseListener(this.single.root);
    }
  }

  private mouseListener(currentThumb: HTMLElement): void {
    currentThumb.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this.writeThumbsShift();

      let clickOffset: number;

      if (this.state.orientation === 'vertical') {
        clickOffset = evt.clientY - currentThumb.getBoundingClientRect().top;
      } else if (this.state.orientation === 'horizontal') {
        clickOffset = evt.clientX - currentThumb.getBoundingClientRect().left;
      }

      const onMouseMove = (evt: MouseEvent): void => {
        evt.preventDefault();

        if (this.state.orientation === 'vertical') {
          if (this.state.type === 'single') {
            this.thumbsShift[0] = evt.clientY - clickOffset;
          } else if (this.state.type === 'range') {
            if (currentThumb === this.from.root) {
              this.thumbsShift[0] = evt.clientY - clickOffset;
            } else if (currentThumb === this.to.root) {
              this.thumbsShift[1] = evt.clientY - clickOffset;
            }
          }
        } else if (this.state.orientation === 'horizontal') {
          if (this.state.type === 'single') {
            this.thumbsShift[0] = evt.clientX - clickOffset;
          } else if (this.state.type === 'range') {
            if (currentThumb === this.from.root) {
              this.thumbsShift[0] = evt.clientX - clickOffset;
            } else if (currentThumb === this.to.root) {
              this.thumbsShift[1] = evt.clientX - clickOffset;
            }
          }
        }
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

  private handlingMouseMotionEvents(
    evt: MouseEvent,
    currentThumb: HTMLElement
  ): void {
    let clickOffset: number;

    if (this.state.orientation === 'vertical') {
      clickOffset = evt.clientY - currentThumb.getBoundingClientRect().top;
    } else if (this.state.orientation === 'horizontal') {
      clickOffset = evt.clientX - currentThumb.getBoundingClientRect().left;
    }

    const onMouseMove = (evt: MouseEvent): void => {
      evt.preventDefault();

      if (this.state.orientation === 'vertical') {
        if (this.state.type === 'single') {
          this.thumbsShift[0] = evt.clientY - clickOffset;
        } else if (this.state.type === 'range') {
          if (currentThumb === this.from.root) {
            this.thumbsShift[0] = evt.clientY - clickOffset;
          } else if (currentThumb === this.to.root) {
            this.thumbsShift[1] = evt.clientY - clickOffset;
          }
        }
      } else if (this.state.orientation === 'horizontal') {
        if (this.state.type === 'single') {
          this.thumbsShift[0] = evt.clientX - clickOffset;
        } else if (this.state.type === 'range') {
          if (currentThumb === this.from.root) {
            this.thumbsShift[0] = evt.clientX - clickOffset;
          } else if (currentThumb === this.to.root) {
            this.thumbsShift[1] = evt.clientX - clickOffset;
          }
        }
      }
    };

    const onMouseUp = (): void => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private writeThumbsShift() {
    if (this.state.orientation === 'horizontal') {
      if (this.state.type === 'single') {
        this.thumbsShift = [this.single.root.getBoundingClientRect().left];
      } else if (this.state.type === 'range') {
        this.thumbsShift = [
          this.from.root.getBoundingClientRect().left,
          this.to.root.getBoundingClientRect().left,
        ];
      }
    } else if (this.state.orientation === 'vertical') {
      if (this.state.type === 'single') {
        this.thumbsShift = [this.single.root.getBoundingClientRect().top];
      } else if (this.state.type === 'range') {
        this.thumbsShift = [
          this.from.root.getBoundingClientRect().top,
          this.to.root.getBoundingClientRect().top,
        ];
      }
    }
  }

  // public getThumbsSize(): Array<number> {
  //   let thumbWidth: Array<number> = [];

  //   if (this.orientation === 'vertical') {
  //     if (this.type === 'range') {
  //       thumbWidth.push(this.from.root.offsetHeight);
  //       thumbWidth.push(this.to.root.offsetHeight);
  //     } else {
  //       thumbWidth.push(this.single.root.offsetHeight);
  //     }
  //   } else if (this.orientation === 'horizontal') {
  //     if (this.type === 'range') {
  //       thumbWidth.push(this.from.root.offsetWidth);
  //       thumbWidth.push(this.to.root.offsetWidth);
  //     } else {
  //       thumbWidth.push(this.single.root.offsetWidth);
  //     }
  //   }

  //   return thumbWidth;
  // }

  // public moveThumbs(values: Array<number>) {
  //   if (this.orientation === 'vertical') {
  //     if (this.type === 'range') {
  //       this.from.root.style.top = `${values[0]}px`;
  //       this.to.root.style.top = `${values[1]}px`;
  //     } else {
  //       this.single.root.style.top = `${values[0]}px`;
  //     }
  //   } else if (this.orientation === 'horizontal') {
  //     if (this.type === 'range') {
  //       this.from.root.style.left = `${values[0]}px`;
  //       this.to.root.style.left = `${values[1]}px`;
  //     } else {
  //       this.single.root.style.left = `${values[0]}px`;
  //     }
  //   }
  // }

  // public updateInputTooltip(value: Array<number>): void {
  //   if (this.type === 'range') {
  //     this.from.root.style.setProperty('--from-input-value', `${value[0]}`);
  //     this.to.root.style.setProperty('--to-input-value', `${value[1]}`);
  //   } else {
  //     this.single.root.style.setProperty('--input-value', `${value[0]}`);
  //   }
  // }

  // public getRoot(): Array<HTMLElement> {
  //   if (this.type === 'range') {
  //     return [this.from.root, this.to.root];
  //   } else {
  //     return [this.single.root];
  //   }
  // }

  // public mouseEvent(handler: Function): void {
  //   if (this.type === 'range') {
  //     this.mouseListener(this.from.root, handler);
  //     this.mouseListener(this.to.root, handler);
  //   } else {
  //     this.mouseListener(this.single.root, handler);
  //   }
  // }

  // private mouseListener(currentElement: HTMLElement, handler: Function): void {
  //   currentElement.addEventListener('mousedown', (evt) => {
  //     evt.preventDefault();
  //     this.handlingMouseMotionEvents(evt, currentElement, handler);
  //   });

  //   currentElement.ondragstart = function () {
  //     return false;
  //   };
  // }

  // private handlingMouseMotionEvents(
  //   evt: MouseEvent,
  //   currentPin: HTMLElement,
  //   handler: Function
  // ): void {
  //   let clickOffset: number;

  //   if (this.orientation === 'vertical') {
  //     clickOffset = evt.clientY - currentPin.getBoundingClientRect().top;
  //   } else {
  //     clickOffset = evt.clientX - currentPin.getBoundingClientRect().left;
  //   }

  //   const onMouseMove = (evt: MouseEvent): void => {
  //     evt.preventDefault();

  //     let shiftPin: number;
  //     const trackWorkingSize = this.observer.notify(
  //       'getTrackWorkingSize',
  //       this.getThumbsSize()
  //     );
  //     const trackClientRect = this.observer.notify('getTrackRect');

  //     if (this.orientation === 'vertical') {
  //       shiftPin = evt.clientY - trackClientRect.top - clickOffset;
  //     } else if (this.orientation === 'horizontal') {
  //       shiftPin = evt.clientX - trackClientRect.left - clickOffset;
  //     }
  //     if (shiftPin < 0) shiftPin = 0;
  //     if (shiftPin > trackWorkingSize) shiftPin = trackWorkingSize;

  //     handler(shiftPin, trackWorkingSize, this.getPinType(currentPin));
  //   };

  //   const onMouseUp = (): void => {
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);

  //     this.observer.notify('onFinish');
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // }

  // private getPinType(currentPin: HTMLElement): string {
  //   let pinType: string;
  //   switch (currentPin) {
  //     case this.from.root:
  //       pinType = 'from';
  //       break;
  //     case this.to.root:
  //       pinType = 'to';
  //       break;
  //     default:
  //       pinType = 'single';
  //   }
  //   return pinType;
  // }

  // private changeThumbsOnClick(value: EventValue): void {
  //   let thumbShift: number = this.getThumbShift(value.evt);
  //   let trackSize: number = this.observer.notify(
  //     'getTrackWorkingSize',
  //     this.getThumbsSize()
  //   );

  //   if (thumbShift < 0) thumbShift = 0;
  //   if (thumbShift > trackSize) thumbShift = trackSize;

  //   if (this.type === 'range') {
  //     const range: number = this.getRangeBetweenThumbs();

  //     if (this.isClickRefersToTheFromThumb(value.evt, range)) {
  //       value.handler(thumbShift, trackSize, 'from');
  //     } else {
  //       value.handler(thumbShift, trackSize, 'to');
  //     }
  //   } else {
  //     value.handler(thumbShift, trackSize, 'single');
  //   }
  // }

  // Считает расстояние смещения пина относительно трека (для type='single')
  // или смещение пина 'from' (для type='range')

  // private getThumbShift(evt: MouseEvent): number {
  //   let thumbShift: number;
  //   const trackRect: DOMRect = this.observer.notify('getTrackRect');

  //   if (this.orientation === 'vertical') {
  //     if (this.type === 'range') {
  //       thumbShift =
  //         evt.clientY - trackRect.top - this.from.root.offsetHeight / 2;
  //     } else {
  //       thumbShift =
  //         evt.clientY - trackRect.top - this.single.root.offsetHeight / 2;
  //     }
  //   } else {
  //     if (this.type === 'range') {
  //       thumbShift =
  //         evt.clientX - trackRect.left - this.from.root.offsetWidth / 2;
  //     } else {
  //       thumbShift =
  //         evt.clientX - trackRect.left - this.single.root.offsetWidth / 2;
  //     }
  //   }
  //   return thumbShift;
  // }

  // Считает растояние между 'from' и 'to' (для type='range')

  // private getRangeBetweenThumbs(): number {
  //   let range: number;
  //   if (this.orientation === 'vertical') {
  //     range =
  //       this.to.root.getBoundingClientRect().top -
  //       this.from.root.getBoundingClientRect().top;
  //   } else if (this.orientation === 'horizontal') {
  //     range =
  //       this.to.root.getBoundingClientRect().left -
  //       this.from.root.getBoundingClientRect().left;
  //   }
  //   return range;
  // }

  // Указывает относится ли клик по треку к 'from'

  // private isClickRefersToTheFromThumb(
  //   evt: MouseEvent,
  //   sliderRange: number
  // ): boolean {
  //   if (this.orientation === 'vertical') {
  //     return (
  //       evt.clientY <=
  //       this.from.root.getBoundingClientRect().top + sliderRange / 2
  //     );
  //   } else if (this.orientation === 'horizontal') {
  //     return (
  //       evt.clientX <=
  //       this.from.root.getBoundingClientRect().left + sliderRange / 2
  //     );
  //   }
  // }

  // private moveThumbsOnClickToTrack(value: EventValue) {
  //   if (this.type === 'range') {
  //     const range: number = this.getRangeBetweenThumbs();
  //     if (this.isClickRefersToTheFromThumb(value.evt, range)) {
  //       this.handlingMouseMotionEvents(
  //         value.evt,
  //         this.from.root,
  //         value.handler
  //       );
  //     } else {
  //       this.handlingMouseMotionEvents(value.evt, this.to.root, value.handler);
  //     }
  //   } else {
  //     this.handlingMouseMotionEvents(
  //       value.evt,
  //       this.single.root,
  //       value.handler
  //     );
  //   }
  // }
}
