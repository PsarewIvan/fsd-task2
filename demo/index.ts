import './styles.scss';
import $ from 'jquery';
import '../src/';

class Slider {
  private slider: JQuery;

  constructor(element: JQuery, options: Object) {
    this.slider = element;
    this.slider.freeSlider(options);
  }

  public getValue(): number[] {
    return this.slider.freeSlider('getValue');
  }

  public setValue(values: number[]): void {
    this.slider.freeSlider('setValue', values);
  }
}

const Slider1 = new Slider($('#slider-1'), {
  min: -100,
  max: 50,
  value: -50,
  step: 0.1,
  scale: true,
  // onChange: function (values: number[]) {
  //   console.log('OnChange Values: ', values);
  // },
  // onFinish: function (values: number[]) {
  //   console.log('OnFinish Values: ', values);
  // },
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
