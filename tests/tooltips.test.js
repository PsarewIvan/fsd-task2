import Tooltips from '../src/components/view/Tooltips';
import '@testing-library/jest-dom/extend-expect';

const state = {
  max: 1000,
  min: 200,
};
let tooltips;

beforeEach(() => {
  tooltips = new Tooltips(document.body, state);
  tooltips.render(state);
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('Render min tooltips', () => {
  expect(tooltips.min.root).toBeInTheDocument();
});

it('Render max tooltips', () => {
  expect(tooltips.max.root).toBeInTheDocument();
});

it('Updated min tooltips to 20', () => {
  const state = { min: 20, max: 30, tooltips: true };
  tooltips.update(state);
  expect(tooltips.min.root.innerHTML).toBe('20');
});

it('Updated max tooltips to 40', () => {
  const state = { min: 20, max: 40, tooltips: true };
  tooltips.update(state);
  expect(tooltips.max.root.innerHTML).toBe('40');
});

it('When tooltips is false, root node must be empty', () => {
  tooltips.update({ tooltips: false });
  expect(tooltips.root.innerHTML).toBe('');
});

it('When tooltips is false, min and max must be destroy', () => {
  tooltips.update({ tooltips: false });
  expect(tooltips.max).toBeUndefined();
  expect(tooltips.min).toBeUndefined();
});
