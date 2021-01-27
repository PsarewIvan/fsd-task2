export interface Settings {
  min: number;
  max: number;
  step: number;
  value?: number;
  from?: number;
  to?: number;
  type?: string;
  orientation?: string;
  onChange?: (value: number) => void;
  onFinish?: (value: number) => void;
}

export interface Methods {
  init: (options?: Partial<Settings>) => JQuery<HTMLElement>;
  getValue: () => number;
  setValue: (value: number) => void;
}

declare global {
  interface JQuery {
    freeSlider: (options?: Partial<Settings> | string, arg?: number) => JQuery;
  }
}
