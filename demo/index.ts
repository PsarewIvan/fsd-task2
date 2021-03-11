import $ from 'jquery';
import Slider from './scripts/Slider/Slider';
import './styles/styles.scss';
import '../src';

const Slider1 = new Slider($('#slider-1'), {
  min: 300,
  max: 500,
  values: [400],
  step: 0.1,
  scale: true,
  scaleMark: 10,
  subScaleMark: 5,
});

const Slider2 = new Slider($('#slider-2'), {
  type: 'range',
  min: -100,
  max: 300,
  values: [30, 100],
  step: 10,
  scale: true,
});

const SLider3 = new Slider($('#slider-3'), {
  orientation: 'vertical',
  min: 0,
  max: 100,
  values: [30],
  step: 1,
  scale: true,
  hints: false,
  tooltips: false,
});

const Slider4 = new Slider($('#slider-4'), {
  orientation: 'vertical',
  type: 'range',
  min: -100,
  max: 100,
  values: [0, 50],
  step: 5,
});
