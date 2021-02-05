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
  tooltips?: boolean;
  onChange?: (value: number) => void;
  onFinish?: (value: number) => void;
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
}

export interface TooltipsState {
  min: number;
  max: number;
}

export interface Methods {
  init: (options?: Partial<Settings>) => JQuery<HTMLElement>;
  getValue: () => number;
  setValue: (value: number) => void;
}

export interface RequiredThumb {
  name: string;
  root: HTMLElement;
}

declare global {
  interface JQuery {
    freeSlider: (options?: Partial<Settings> | string, arg?: number) => JQuery;
  }
}
