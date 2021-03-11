import SliderElement from './components/view/SliderElement';

interface Settings {
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

interface Methods {
  init: (options?: Partial<Settings>) => JQuery;
  update: (state: Partial<Settings>) => void;
  getState: () => Settings;
  onChange: (handler: Function) => void;
  onLoad: (handler: Function) => void;
}

interface RequiredThumb {
  index: number;
  root: SliderElement;
}

interface ModelConstants {
  SINGLE: SliderType;
  RANGE: SliderType;
  VERTICAL: SliderOrientation;
  HORIZONTAL: SliderOrientation;
}

interface TickState {
  markNumber: number,
  subMark: number,
  index: number,
  step: number,
  min: number
}

type ThumbType = 'single' | 'from' | 'to';
type SliderType = 'single' | 'range';
type SliderOrientation = 'vertical' | 'horizontal';
type DirectionType = 'left' | 'top';
type OffsetSizeType = 'offsetWidth' | 'offsetHeight';
type SizeType = 'width' | 'height';
type CoordsType = 'clientX' | 'clientY';

declare global {
  interface JQuery {
    freeSlider: (
      options?: Partial<Settings> | string,
      arg?: Partial<Settings> | Function
    ) => JQuery | Array<number> | Settings | void;
  }
}

export {
  Settings,
  Methods,
  RequiredThumb,
  ModelConstants,
  ThumbType,
  SliderType,
  SliderOrientation,
  DirectionType,
  OffsetSizeType,
  SizeType,
  CoordsType,
  TickState,
};
