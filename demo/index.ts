import './styles.scss';
import $ from 'jquery';
import '../src/';

const slider = $('.free-slider');

slider.freeSlider({
  min: 0,
  max: 10,
  value: 2,
  step: 0.1,
  // onChange: function(value) {
  //   console.log('OnChange Value: ', value);
  // },
  // onFinish: function (value) {
  //   console.log('OnFinish Value: ', value);
  // }
});

const value = slider.freeSlider('getValue');
console.log(value);
slider.freeSlider('setValue', 5);

$('.free-slider2').freeSlider({
  min: 10,
  max: 30,
  value: 20,
  step: 1.25
});
