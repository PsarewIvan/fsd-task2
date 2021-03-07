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

it('Should be returned slider state on public API', () => {
  const returnedState = presenter.getState();
  expect(returnedState).toEqual(state);
});

it('Should be set new value on public API', () => {
  presenter.update({ values: [20] });
  const values = presenter.getState().values;
  expect(values).toEqual([20]);
});

it('Should be set new range values on public API', () => {
  const presenter = new Presenter(document.body, { type: 'range' });
  presenter.update({ values: [10, 20] });
  const values = presenter.getState().values;
  expect(values).toEqual([10, 20]);
});

it('Should be set new second values on public API', () => {
  const presenter = new Presenter(document.body, { type: 'range' });
  presenter.update({ values: [, 20] });
  const values = presenter.getState().values;
  expect(values).toEqual([10, 20]);
});

it('Should be set new first values on public API', () => {
  const presenter = new Presenter(document.body, { type: 'range' });
  presenter.update({ values: [3] });
  const values = presenter.getState().values;
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
  presenter.update({ step: 13 });
  expect(presenter.getState().step).toBe(13);
});

it('Should be update model when Min updated', () => {
  presenter.update({ min: 15 });
  expect(presenter.getState().min).toBe(15);
});

it('Should be update model when Max updated', () => {
  presenter.update({ max: 450 });
  expect(presenter.getState().max).toEqual(450);
});

it('Should be update model when scale updated', () => {
  presenter.update({ scale: false });
  expect(presenter.getState().scale).toBe(false);
});

it('Should be update model when hints updated', () => {
  presenter.update({ hints: false });
  expect(presenter.getState().hints).toEqual(false);
});

it('Should be update model when tooltips updated', () => {
  presenter.update({ tooltips: false });
  expect(presenter.getState().tooltips).toBe(false);
});

it('Should be update model when orientation updated', () => {
  presenter.update({ orientation: 'vertical' });
  expect(presenter.getState().orientation).toBe('vertical');
});
