import './styles/structure.scss';
import './styles/theme.scss';
import SliderPresenter from './components/SliderPresenter';
import { Settings } from './types';

export default class FreeSlider {
  private freeSlider: SliderPresenter;

  constructor(node: HTMLElement, options: Partial<Settings>) {
    this.freeSlider = new SliderPresenter(node, options);
  }

  public method(): SliderPresenter {
    return this.freeSlider;
  }
}
