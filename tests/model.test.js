import Model from '../src/components/Model';

let model;

describe('Common test', () => {
  const state = {
    min: 0,
    max: 500,
    step: 2,
    values: [100],
    type: 'single',
    percents: [20],
    orientation: 'horizontal',
    scale: true,
    scaleMark: 5,
    subScaleMark: 4,
    tooltips: true,
    hints: true,
    onChange: jest.fn((value) => value),
    onFinish: jest.fn((value) => value),
    onUpdate: jest.fn((value) => value),
  };

  beforeEach(() => {
    model = new Model(state);
  });

  it('Model should be accpet default state, when transmitted state is empty', () => {
    const model = new Model();
    expect(model.getSettings()).toEqual({
      min: 0,
      max: 100,
      step: 1,
      orientation: 'horizontal',
      tooltips: true,
      scale: false,
      hints: true,
      scaleMark: 4,
      subScaleMark: 5,
      percents: [0.5],
      values: [50],
      type: 'single',
    });
  });

  it('Scale should be update', () => {
    model.updateModel({ scale: false });
    expect(model.getSettings().scale).toBe(false);
  });

  it('Orientation should be update to vertical', () => {
    model.updateModel({ orientation: 'vertical' });
    expect(model.getSettings().orientation).toBe('vertical');
  });

  it('Orientation should be update to horizontal', () => {
    const model = new Model({ orientation: 'vertical' });
    model.updateModel({ orientation: 'horizontal' });
    expect(model.getSettings().orientation).toBe('horizontal');
  });

  it('Hint should be update to false', () => {
    model.updateModel({ hints: false });
    expect(model.getSettings().hints).toBe(false);
  });

  it('Hint should be update to true', () => {
    const model = new Model({ hints: false });
    model.updateModel({ hints: true });
    expect(model.getSettings().hints).toBe(true);
  });

  it('Tooltips should be update to false', () => {
    model.updateModel({ tooltips: false });
    expect(model.getSettings().tooltips).toBe(false);
  });

  it('Tooltips should be update to true', () => {
    const model = new Model({ tooltips: false });
    model.updateModel({ tooltips: true });
    expect(model.getSettings().tooltips).toBe(true);
  });
});

describe('Single slider', () => {
  const state = {
    min: 0,
    max: 500,
    step: 2,
    values: [100],
    type: 'single',
    percents: [20],
    orientation: 'horizontal',
    scale: true,
    scaleMark: 5,
    subScaleMark: 4,
    tooltips: true,
    hints: true,
    onChange: jest.fn((value) => value),
    onFinish: jest.fn((value) => value),
    onUpdate: jest.fn((value) => value),
  };

  beforeEach(() => {
    model = new Model(state);
  });

  it('Values should be update, when input values is correct', () => {
    model.updateModel({ values: [400] });
    expect(model.getSettings().values).toEqual([400]);
  });

  it('Values should not be update, when input values is incorrect', () => {
    model.updateModel({ values: [600] });
    expect(model.getSettings().values).toEqual([500]);
  });

  it('Step should be update, when step value more then 0', () => {
    model.updateModel({ step: 10 });
    expect(model.getSettings().step).toBe(10);
  });

  it('Step should be update to 1, when step value less then 0', () => {
    model.updateModel({ step: -4 });
    expect(model.getSettings().step).toBe(1);
  });

  it('Min should be update, when value less than thumb value', () => {
    model.updateModel({ min: 50 });
    expect(model.getSettings().min).toBe(50);
  });

  it('Min should be update to thumb, when value more than thumb value', () => {
    model.updateModel({ min: 300 });
    expect(model.getSettings().min).toBe(100);
  });

  it('Max should be update, when value more than thumb value', () => {
    model.updateModel({ max: 200 });
    expect(model.getSettings().max).toBe(200);
  });

  it('Max should be update to thumb, when value less than thumb value', () => {
    model.updateModel({ max: 0 });
    expect(model.getSettings().max).toBe(100);
  });

  it('Value should be update on view method with percents', () => {
    model.setNewValue(0.5, 0);
    expect(model.getSettings().values).toEqual([250]);
  });
});

describe('Range slider', () => {
  const state = {
    min: 100,
    max: 300,
    step: 1,
    values: [150, 200],
    type: 'range',
    orientation: 'horizontal',
    scale: true,
    scaleMark: 10,
    subScaleMark: 2,
    tooltips: true,
    hints: true,
    onChange: jest.fn((value) => value),
    onFinish: jest.fn((value) => value),
    onUpdate: jest.fn((value) => value),
  };

  beforeEach(() => {
    model = new Model(state);
  });

  it('First values should be update, when input values is correct', () => {
    model.updateModel({ values: [160] });
    expect(model.getSettings().values).toEqual([160, 200]);
  });

  it('Second values should be update, when input values is correct', () => {
    model.updateModel({ values: [, 250] });
    expect(model.getSettings().values).toEqual([150, 250]);
  });

  it('Two values should be update, when input values is correct', () => {
    model.updateModel({ values: [180, 220] });
    expect(model.getSettings().values).toEqual([180, 220]);
  });

  it('Values should not be update, when input values is incorrect', () => {
    model.updateModel({ values: [400] });
    expect(model.getSettings().values).toEqual([200, 200]);
  });

  it('The step should not be greater than the range of values', () => {
    model.updateModel({ step: 201 });
    expect(model.getSettings().step).toBe(200);
  });

  it('Min should be update, when value less than first thumb value', () => {
    model.updateModel({ min: 120 });
    expect(model.getSettings().min).toBe(120);
  });

  it('Min should be update to first thumb, when value more than first thumb value', () => {
    model.updateModel({ min: 400 });
    expect(model.getSettings().min).toBe(150);
  });

  it('Max should be update, when value less than second thumb value', () => {
    model.updateModel({ max: 0 });
    expect(model.getSettings().max).toBe(200);
  });

  it('Max should be update to second thumb, when value more than second thumb value', () => {
    model.updateModel({ max: 600 });
    expect(model.getSettings().max).toBe(600);
  });

  it('First value should be update on view method with percents', () => {
    model.setNewValue(0.1, 0);
    expect(model.getSettings().values).toEqual([120, 200]);
  });

  it('Second value should be update on view method with percents', () => {
    model.setNewValue(0.9, 1);
    expect(model.getSettings().values).toEqual([150, 280]);
  });
});
