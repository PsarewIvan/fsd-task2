import $ from 'jquery';
import FreeSlider from './FreeSlider';
import { Settings, Methods, SliderOrientation } from './types';

(($) => {
  const methods: Methods = {
    init(options?: Partial<Settings>): JQuery {
      return this.each((_i: number, node: HTMLElement) => {
        const freeSlider: FreeSlider = new FreeSlider(node, options);

        $(this).data('freeSlider', freeSlider);
      });
    },

    getValue(): number[] {
      return $(this).data().freeSlider.method().getCurrentValue();
    },

    setValue(values: number[]): void {
      $(this).data().freeSlider.method().setValue(values);
    },

    getState(): Settings {
      return $(this).data().freeSlider.method().getState();
    },

    changeStep(step: number): void {
      return $(this).data().freeSlider.method().changeStep(step);
    },

    changeMin(value: number): void {
      return $(this).data().freeSlider.method().changeMin(value);
    },

    changeMax(value: number): void {
      return $(this).data().freeSlider.method().changeMax(value);
    },

    showScale(isScale: boolean): void {
      return $(this).data().freeSlider.method().showScale(isScale);
    },

    changeOrientation(orientation: SliderOrientation): void {
      $(this).data().freeSlider.method().changeOrientation(orientation);
    },

    showHint(isHint: boolean): void {
      $(this).data().freeSlider.method().showHint(isHint);
    },

    showTooltips(isTooltips: boolean): void {
      $(this).data().freeSlider.method().showTooltips(isTooltips);
    },

    onChange(handler: Function): void {
      $(this).data().freeSlider.method().onChange(handler);
    },

    onLoad(handler: Function): void {
      $(this).data().freeSlider.method().onLoad(handler);
    },
  };

  $.fn.freeSlider = function (
    action?: Partial<Settings> | string,
    args?: number[] | Function | number | boolean | SliderOrientation
  ) {
    if (typeof action === 'string' && methods[action]) {
      return methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      return methods.init.call(this, action);
    } else {
      throw new Error(`Метода ${action} не существует для freeSlider`);
    }
  };
})($);
