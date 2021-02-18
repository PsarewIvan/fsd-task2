import Track from '../src/components/view/Track';
import { screen, getAllByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

const state = {
  type: 'single',
  orientation: 'horizontal',
};

const stateVertical = {
  type: 'single',
  orientation: 'vertical',
};

it('Render Track', () => {
  const track = new Track(document.body, state);
  expect(track.root).toBeInTheDocument();
});

it('Accepts `className`', () => {
  const track = new Track(document.body, state);
  expect(track.root).toHaveClass('free-slider__track');
});

// it('Return sizes for horizontal', () => {
//   const track = new Track(document.body, state);
//   expect(track.getTrackSize()).toBe(100);
// });
