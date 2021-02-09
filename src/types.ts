export interface Settings {
  min: number;
  max: number;
  step: number;
  value?: number;
  from?: number;
  to?: number;
  values?: Array<number>;
  percents?: Array<number>;
  type?: string;
  orientation?: string;
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
  type: string;
  orientation: string;
}
export interface ExpandedState {
  type: string;
  orientation: string;
  min: number;
  max: number;
  isHints: boolean;
}

export interface ScaleState {
  orientation: string;
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
  setValue: (value: Array<number>) => void;
}

export interface RequiredThumb {
  name: string;
  root: HTMLElement;
}

declare global {
  interface JQuery {
    freeSlider: (
      options?: Partial<Settings> | string,
      arg?: Array<number>
    ) => number[] | void | JQuery;
  }
}
