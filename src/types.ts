export interface Settings {
  min: number;
  max: number;
  step: number;
  values?: Array<number>;
  percents?: Array<number>;
  type?: SliderType;
  orientation?: SliderOrientation;
  scale?: boolean;
  scaleMark: number;
  subScaleMark: number;
  tooltips?: boolean;
  hints?: boolean;
  onChange?: (value: Array<number>) => void;
  onFinish?: (value: Array<number>) => void;
  onUpdate?: (value: Array<number>) => void;
}

export interface State {
  type: SliderType;
  orientation: SliderOrientation;
}
export interface ExpandedState {
  type: SliderType;
  orientation: SliderOrientation;
  min: number;
  max: number;
  isHints: boolean;
}

export interface ScaleState {
  orientation: SliderOrientation;
  markNumber: number;
  subMarkNumber: number;
  min: number;
  max: number;
}

export interface TooltipsState {
  min: number;
  max: number;
}

export interface Methods {
  init: (options?: Partial<Settings>) => JQuery<HTMLElement>;
  getValue: () => Array<number>;
  setValue: (values: number[]) => void;
  onChange: (values: number[], handler: number) => void;
}

export interface RequiredThumb {
  index: number;
  root: HTMLElement;
}

export type ThumbType = 'single' | 'from' | 'to';
export type SliderType = 'single' | 'range';
export type SliderOrientation = 'vertical' | 'horizontal';
export type DirectionType = 'left' | 'top';
export type SizeType = 'offsetWidth' | 'offsetHeight';
export type SizeTypeCss = 'width' | 'height';
export type CoordType = 'clientX' | 'clientY';

declare global {
  interface JQuery {
    freeSlider: (
      options?: Partial<Settings> | string,
      arg?: Array<number>
    ) => number[] | void | JQuery;
  }
}
