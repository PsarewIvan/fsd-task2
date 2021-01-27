import SliderModel from '../src/components/SliderModel';
import Observer from '../src/components/makeObservableSubject';

// let MockModel;

// beforeEach( () => {
//   MockModel = new SliderModel();
// });

describe('Slider Model', () => {
  test('should create observer', () => {
    const SomeObserver = new Observer;
    const MockModel = new SliderModel();
    expect(MockModel.modelChangedSubject).toEqual(SomeObserver);
  });

  test('should write default settings', () => {
    const defaultSettings = {
      min: 0,
      max: 100,
      value: 50,
      step: 1,
      type: 'single'
    };
    const MockModel = new SliderModel();
    expect(MockModel.getSettings()).toEqual(defaultSettings);
  });

  test('should write singleSLider 1 settings', () => {
    const settings = {
      min: 20
    };
    const MockModel = new SliderModel(settings);
    expect(MockModel.getSettings()).toEqual({
      min: 20,
      max: 100,
      value: 50,
      step: 1,
      type: 'single'
    });
  });

  test('should write default settings on rangeSlider', () => {
    const settings = {
      type: 'range'
    };
    const MockModel = new SliderModel(settings);
    expect(MockModel.getSettings()).toEqual({
      min: 0,
      max: 100,
      from: 10,
      to: 90,
      step: 1,
      type: 'range'
    });
  });

  test('should write 1 new option on rangeSlider', () => {
    const settings = {
      type: 'range',
      step: 0.5
    };
    const MockModel = new SliderModel(settings);
    expect(MockModel.getSettings()).toEqual({
      min: 0,
      max: 100,
      from: 10,
      to: 90,
      step: 0.5,
      type: 'range'
    });
  });

  test('should create Range slider with empty "type"', () => {
    const settings = {
      min: 0,
      max: 200,
      from: 10,
      to: 100
    };
    const MockModel = new SliderModel(settings);
    expect(MockModel.getSettings()).toEqual({
      min: 0,
      max: 200,
      from: 10,
      to: 100,
      step: 1,
      type: 'range'
    });
  });

  test('should set new param on single slider', () => {
    const newSettings = {
      min: 0,
      max: 200,
      value: 100
    };
    const MockModel = new SliderModel();
    MockModel.setSettings(newSettings);
    expect(MockModel.getSettings()).toEqual({
      min: 0,
      max: 200,
      value: 100,
      step: 1,
      type: 'single'
    });
  });

  test('should set new param on range slider', () => {
    const newSettings = {
      min: 30,
      max: 1000,
      from: 100,
      to: 500
    };
    const MockModel = new SliderModel({type: 'range'});
    MockModel.setSettings(newSettings);
    expect(MockModel.getSettings()).toEqual({
      min: 30,
      max: 1000,
      from: 100,
      to: 500,
      step: 1,
      type: 'range'
    });
  });

  test('should rounds a random float number to 5 decimal places', () => {
    const MockModel = new SliderModel();
    const randomNumbers = [-12, -3.2, -1.123459, -1.123451, 0, 1.8, 3.123459, 4.123451, 5];
    let resultArray = [];

    randomNumbers.forEach( (num) => {
      resultArray.push(MockModel.round(num, 5));
    });
    expect(resultArray).toEqual([-12, -3.2, -1.12346, -1.12345, 0, 1.8, 3.12346, 4.12345, 5]);
  });

  test('should calculate slider value of pin shift relatively slider width', () => {
    const randomSettings = {
      min: 0,
      max: 100,
      value: 50,
      step: 1
    }
    const MockModel = new SliderModel(randomSettings);
    const randomShift = [0, 10, 30, 50, 70, 100];
    let resultArray = [];

    randomShift.forEach( (num) => {
      resultArray.push(MockModel.calcValue(num, 100));
    });
    expect(resultArray).toEqual(randomShift);
  });
});


