import Bar from '../src/components/view/Bar';
import '@testing-library/jest-dom/extend-expect';

const stateDefault = {
  type: 'single',
  orientation: 'horizontal',
};

const stateDefaultVertical = {
  type: 'single',
  orientation: 'vertical',
};

const stateRange = {
  type: 'range',
  orientation: 'horizontal',
};

const stateRangeVertical = {
  type: 'range',
  orientation: 'vertical',
};

it('Render bar', () => {
  const bar = new Bar(document.body, stateDefault);
  expect(bar.root).toBeInTheDocument();
});

it('Bar style "pointer-events" must be "none"', () => {
  const bar = new Bar(document.body, stateDefault);
  expect(bar.root.style.pointerEvents).toBe('none');
});

it('Single horizontal bar width should be 20% when it updated by 0.2', () => {
  const bar = new Bar(document.body, stateDefault);
  bar.update([0.2]);
  expect(bar.root.style.width).toBe('20%');
});

it('Single vertical bar height should be 45% when it updated by 0.45', () => {
  const bar = new Bar(document.body, stateDefaultVertical);
  bar.update([0.45]);
  expect(bar.root.style.height).toBe('45%');
});

it('Range horizontal bar width should start at 15% and end at 38% when it updated by [0.1, 0.53]', () => {
  const bar = new Bar(document.body, stateRange);
  bar.update([0.15, 0.53]);
  expect(bar.root.style.width).toBe('38%');
  expect(bar.root.style.left).toBe('15%');
});

it('Range vertical bar width should start at 25% and end at 95% when it updated by [0.25, 0.95]', () => {
  const bar = new Bar(document.body, stateRangeVertical);
  bar.update([0.25, 0.95]);
  expect(bar.root.style.height).toBe('70%');
  expect(bar.root.style.top).toBe('25%');
});
