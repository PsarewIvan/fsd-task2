import SliderPresenter from '../layers/presenter';
import { Settings } from '../layers/interfaces';

;(function ($) {
  $.fn.mySlider = function (options?: Partial<Settings>) {
    new SliderPresenter(this.first(), options);
    return this.first();
  };
}(jQuery));
