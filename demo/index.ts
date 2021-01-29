import './styles.scss';
import $ from 'jquery';
import '../src/';

const slider = $('.slider');

slider.freeSlider({
  min: -100,
  max: -80,
  value: -90,
  step: 0.1,
  // onChange: function(value) {
  //   console.log('OnChange Value: ', value);
  // },
  // onFinish: function (value) {
  //   console.log('OnFinish Value: ', value);
  // }
});

// console.log(slider.freeSlider('getValue'));

$('.slider--range').freeSlider({
  type: 'range',
  min: -100,
  max: 300,
  from: 30,
  to: 100,
  step: 2,
  // onChange: function(value) {
  //   console.log('OnChange Value: ', value);
  // },
  // onFinish: function (value) {
  //   console.log('OnFinish Value: ', value);
  // }
});

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
