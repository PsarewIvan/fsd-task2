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

$('.my-slider2').mySlider({
  min: 10,
  max: 300,
  value: 100
});
