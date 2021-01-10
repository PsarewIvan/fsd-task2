import SliderPresenter from '../layers/presenter';

;(function ($) {
  $.fn.mySlider = function (options: object) {
    new SliderPresenter(this.first(), options);
    return this.first();
  };
}(jQuery));
