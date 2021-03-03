import Track from '../src/components/view/Track';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const stateHorizontal = {
  orientation: 'horizontal',
};

const stateVertical = {
  orientation: 'vertical',
};

it('Render Track', () => {
  const track = new Track(document.body, stateHorizontal);
  expect(track.root).toBeInTheDocument();
});

it('Accepts `className`', () => {
  const track = new Track(document.body, stateHorizontal);
  expect(track.root).toHaveClass('free-slider__track');
});

it('Return distance to screen for horizontal', () => {
  const track = new Track(document.body, stateHorizontal);
  track.root.getBoundingClientRect = jest.fn(() => ({
    left: 200,
  }));
  expect(track.getDistanceToScreen()).toBe(200);
});

it('Return distance to screen for vertical', () => {
  const track = new Track(document.body, stateVertical);
  track.root.getBoundingClientRect = jest.fn(() => ({
    top: 150,
  }));
  expect(track.getDistanceToScreen()).toBe(150);
});

it('Click to track listener', () => {
  const track = new Track(document.body, stateHorizontal);
  const handler = jest.fn();
  track.clickEvent(handler);
  userEvent.click(track.root);
  expect(handler).toHaveReturned();
});
