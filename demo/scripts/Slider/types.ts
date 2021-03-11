import ValuesInputs from './components/ValuesInputs';
import StepInput from './components/StepInput';
import MinInput from './components/MinInput';
import MaxInput from './components/MaxInput';
import ScaleToggle from './components/ScaleToggle';
import OrientationChange from './components/OrientationChange';
import HintToggle from './components/HintToggle';
import TooltipsToggle from './components/TooltipsToggle';

interface Settings {
  min: number;
  max: number;
  step: number;
  values: Array<number>;
  percents: Array<number>;
  type: 'single' | 'range';
  orientation: 'horizontal' | 'vertical';
  scale: boolean;
  scaleMark: number;
  subScaleMark: number;
  tooltips: boolean;
  hints: boolean;
  onChange: (value: Array<number>) => void;
  onFinish: (value: Array<number>) => void;
  onUpdate: (value: Array<number>) => void;
}

type ElementsType = [
  ValuesInputs,
  MinInput,
  MaxInput,
  StepInput,
  HintToggle,
  TooltipsToggle,
  ScaleToggle,
  OrientationChange
];

export { Settings, ElementsType };
