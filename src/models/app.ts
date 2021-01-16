import SliderPresenter from '../layers/presenter';
import { IUserSettings } from '../layers/interfaces';

;(function ($) {
  $.fn.mySlider = function (options?: IUserSettings) {
    new SliderPresenter(this.first(), options);
    return this.first();
  };
}(jQuery));
