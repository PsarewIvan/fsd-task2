import './styles.scss';
import $ from 'jquery';
import '../src/';

$('.free-slider').freeSlider({
  min: 0,
  max: 100,
  value: 25,
  // onChange: function(value) {
  //   console.log('OnChange Value: ', value);
  // },
  // onFinish: function (value) {
  //   console.log('OnFinish Value: ', value);
  // }
});

$('.free-slider2').freeSlider({
  min: 10,
  max: 300,
  value: 100
});
