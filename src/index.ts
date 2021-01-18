import $ from 'jquery';
import FreeSlider from './FreeSlider';
import { Settings } from './types';

$.fn.freeSlider = function (options?: Partial<Settings>) {
  return this.each((i: number, node: HTMLElement) => {
    new FreeSlider(node, options);
  });
};
