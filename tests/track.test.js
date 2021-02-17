import '@testing-library/jest-dom/extend-expect';
import { getAllByText } from '@testing-library/dom';
import Track from '../src/components/view/Track';

const state = {
  type: 'single',
  orientation: 'horizontal',
};

it('Render Track', () => {
  const track = new Track(document.body, state);
  expect(track.root).toBeInTheDocument();
});

it('Accepts `className`', () => {
  const track = new Track(document.body, state);
  // const hasClass = track.root.classList.contains('free-slider__track');
  // expect(hasClass).toBe(true);
  expect(track.root).toHaveClass('free-slider__track');
});
