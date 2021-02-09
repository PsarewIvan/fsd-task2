import './styles.scss';
import $ from 'jquery';
import '../src/';
import Slider from './Slider';

const Slider1 = new Slider($('#slider-1'), {
  min: -100,
  max: 50,
  value: -50,
  step: 0.1,
  scale: true,
});

const Slider2 = new Slider($('#slider-2'), {
  type: 'range',
  min: -100,
  max: 300,
  from: 30,
  to: 100,
  step: 10,
});

const SLider3 = new Slider($('#slider-3'), {
  orientation: 'vertical',
  min: 0,
  max: 100,
  value: 30,
  step: 1,
  scale: true,
  hints: false,
});

const Slider4 = new Slider($('#slider-4'), {
  orientation: 'vertical',
  type: 'range',
  min: -100,
  max: 100,
  from: 0,
  to: 50,
  step: 5,
});
