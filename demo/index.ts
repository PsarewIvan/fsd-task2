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

// console.log(slider.freeSlider('getValue'));

$('.free-slider2').freeSlider({
  type: 'range',
  min: 10,
  max: 300,
  from: 30,
  to: 100,
  step: 2
});
