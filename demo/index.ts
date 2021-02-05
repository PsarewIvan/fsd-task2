import './styles.scss';
import $ from 'jquery';
import '../src/';

const slider = $('.slider');

slider.freeSlider({
  min: -100,
  max: 50,
  value: -50,
  step: 0.1,
  // onChange: function (value) {
  //   console.log('OnChange Value: ', value);
  // },
  // onFinish: function (value) {
  //   console.log('OnFinish Value: ', value);
  // },
});

// console.log(slider.freeSlider('getValue'));

const slider2 = $('.slider--range');
slider2.freeSlider({
  type: 'range',
  min: -100,
  max: 300,
  from: 30,
  to: 100,
  step: 10,
  // onChange: function (value) {
  //   console.log('OnChange Value: ', value);
  // },
  // onFinish: function (value) {
  //   console.log('OnFinish Value: ', value);
  // },
});
slider2.freeSlider('setValue', [null, 50]);

$('.slider--vertical').freeSlider({
  orientation: 'vertical',
  min: 0,
  max: 100,
  value: 30,
  step: 1,
});

$('.slider--vertical--range').freeSlider({
  orientation: 'vertical',
  type: 'range',
  min: -100,
  max: 100,
  from: 0,
  to: 50,
  step: 5,
});
