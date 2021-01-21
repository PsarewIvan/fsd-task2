import './styles.scss';
import $ from 'jquery';
import '../src/';

$('.free-slider').freeSlider({
  min: 0,
  max: 10,
  value: 2,
  step: 0.1,
  onChange: function(value) {
    console.log('OnChange Value: ', value);
  },
  onFinish: function (value) {
    console.log('OnFinish Value: ', value);
  }
});

$('.free-slider2').freeSlider({
  min: 10,
  max: 30,
  value: 20,
  step: 1.25
});
