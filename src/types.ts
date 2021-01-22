import SliderPresenter from './components/SliderPresenter';
export interface Settings {
  min: number;
  max: number;
  value: number;
  step: number;
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
