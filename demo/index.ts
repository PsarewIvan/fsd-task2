import './styles.scss';
import $ from 'jquery';
import '../src/';

const slider = $('.slider');

slider.freeSlider({
  min: -100,
  max: 50,
  value: -50,
  step: 0.1,
  scale: true,
  onChange: function (values) {
    console.log('OnChange Values: ', values);
  },
  onFinish: function (values) {
    console.log('OnFinish Values: ', values);
  },
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
  onChange: function (values) {
    console.log('OnChange Values: ', values);
  },
  onFinish: function (values) {
    console.log('OnFinish Values: ', values);
  },
});
// slider2.freeSlider('setValue', [null, 50]);

$('.slider--vertical').freeSlider({
  orientation: 'vertical',
  min: 0,
  max: 100,
  value: 30,
  step: 1,
  scale: true,
  hints: false,
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
