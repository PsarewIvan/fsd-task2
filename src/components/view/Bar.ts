import SliderElement from './SliderElement';

export default class TrackView extends SliderElement {
  private type: string;
  private orientation: string;

  constructor(type: string, orientation: string) {
    super('free-slider__bar');
    this.type = type;
    this.orientation = orientation;
    this.root.style.pointerEvents = 'none';
  }

  public moveBar(values: Array<number>) {
    if (this.orientation === 'vertical') {
      if (this.type === 'range') {
        this.root.style.top = `${values[0]}px`;
        this.root.style.height = `${values[1] - values[0]}px`;
      } else {
        this.root.style.height = `${values[0]}px`;
      }
    } else if (this.orientation === 'horizontal') {
      if (this.type === 'range') {
        this.root.style.left = `${values[0]}px`;
        this.root.style.width = `${values[1] - values[0]}px`;
      } else {
        this.root.style.width = `${values[0]}px`;
      }
    }
  }
}
