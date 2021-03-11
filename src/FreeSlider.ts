import SliderPresenter from './components/Presenter';
import { Settings } from './types';
import './styles/structure.scss';
import './styles/theme.scss';

class FreeSlider {
  private freeSlider: SliderPresenter;

  constructor(node: HTMLElement, options: Partial<Settings>) {
    this.freeSlider = new SliderPresenter(node, options);
  }

  public method(): SliderPresenter {
    return this.freeSlider;
  }
}

export default FreeSlider;
