import Tooltips from '../src/components/view/Tooltips';
import '@testing-library/jest-dom/extend-expect';

const state = {
  max: 1000,
  min: 200,
};
let tooltips;

beforeEach(() => {
  tooltips = new Tooltips(document.body, state);
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
  tooltips.update(20, 30);
  expect(tooltips.min.root.innerHTML).toBe('20');
});

it('Updated max tooltips to 40', () => {
  tooltips.update(20, 40);
  expect(tooltips.max.root.innerHTML).toBe('40');
});
