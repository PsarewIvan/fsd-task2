import SliderPresenter from './components/SliderPresenter';
export interface Settings {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange?: (value: number) => void;
  onFinish?: (value: number) => void;
}

declare global {
  interface JQuery {
    freeSlider: (options?: Partial<Settings>) => JQuery;
  }
}
