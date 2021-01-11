import '@styles/styles.scss';

function importAll(resolve): void {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.ts$|\.scss$/));

$('.my-slider').mySlider({
  min: 0,
  max: 100,
  value: 30
});
