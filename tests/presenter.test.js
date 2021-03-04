import Presenter from '../src/components/Presenter';

let presenter;
const state = {
  min: 0,
  max: 500,
  step: 2,
  values: [100],
  type: 'single',
  percents: [0.2],
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
  presenter = new Presenter(document.body, state);
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('Model should be create', () => {
  expect(presenter.model).toBeTruthy();
});

it('View should be create', () => {
  expect(presenter.view).toBeTruthy();
});

it('View should be update through observer', () => {
  let mock = 'empty';
  presenter.view.update = (mockValue) => (mock = mockValue);
  presenter.model.modelChangedSubject.notify('viewUpdate', 'view is update');
  expect(mock).toBe('view is update');
});

it('ViewHandler should be return settings when orientation changed', () => {
  let mock = 'empty';
  presenter.viewHandler = (settings) => (mock = settings);
  presenter.model.modelChangedSubject.notify('changeOrientation');
  expect(mock).toEqual(state);
});

it('Should be returned current value on public API', () => {
  const values = presenter.getCurrentValue();
  expect(values).toEqual([100]);
});

it('Should be set new value on public API', () => {
  presenter.setValue([20]);
  const values = presenter.getCurrentValue();
  expect(values).toEqual([20]);
});

it('Should be set new range values on public API', () => {
  const presenter = new Presenter(document.body, { type: 'range' });
  presenter.setValue([10, 20]);
  const values = presenter.getCurrentValue();
  expect(values).toEqual([10, 20]);
});

it('Should be set new second values on public API', () => {
  const presenter = new Presenter(document.body, { type: 'range' });
  presenter.setValue([, 20]);
  const values = presenter.getCurrentValue();
  expect(values).toEqual([10, 20]);
});

it('Should be set new first values on public API', () => {
  const presenter = new Presenter(document.body, { type: 'range' });
  presenter.setValue([3]);
  const values = presenter.getCurrentValue();
  expect(values).toEqual([3, 90]);
});

it('Should be evoke handler with onChange API, when slider will change', () => {
  const handler = jest.fn();
  presenter.onChange(handler);
  presenter.model.modelChangedSubject.notify('onChange');
  expect(handler).toHaveBeenCalled();
});

it('Should be evoke handler when slider is load', () => {
  const handler = jest.fn();
  presenter.onLoad(handler);
  expect(handler).toHaveBeenCalled();
});

it('Should return state when evoke API getState', () => {
  const returnedState = presenter.getState();
  expect(returnedState).toEqual(state);
});

it('Should be update model when step updated', () => {
  let mock = 'empty';
  presenter.model.updateModel = (step) => (mock = step);
  presenter.changeStep(13);
  expect(mock).toEqual({ step: 13 });
});

it('Should be update model when Min updated', () => {
  let mock = 'empty';
  presenter.model.updateModel = (min) => (mock = min);
  presenter.changeMin(15);
  expect(mock).toEqual({ min: 15 });
});

it('Should be update model when Max updated', () => {
  let mock = 'empty';
  presenter.model.updateModel = (max) => (mock = max);
  presenter.changeMax(450);
  expect(mock).toEqual({ max: 450 });
});

it('Should be update model when scale updated', () => {
  let mock = 'empty';
  presenter.model.updateModel = (scale) => (mock = scale);
  presenter.showScale(false);
  expect(mock).toEqual({ scale: false });
});

it('Should be update model when hints updated', () => {
  let mock = 'empty';
  presenter.model.updateModel = (hints) => (mock = hints);
  presenter.showHint(false);
  expect(mock).toEqual({ hints: false });
});

it('Should be update model when tooltips updated', () => {
  let mock = 'empty';
  presenter.model.updateModel = (tooltips) => (mock = tooltips);
  presenter.showTooltips(false);
  expect(mock).toEqual({ tooltips: false });
});

it('Should be update model when orientation updated', () => {
  let mock = 'empty';
  presenter.model.changeOrientation = (orientation) => (mock = orientation);
  presenter.changeOrientation('vertical');
  expect(mock).toBe('vertical');
});
