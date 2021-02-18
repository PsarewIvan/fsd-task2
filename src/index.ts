import $ from 'jquery';
import FreeSlider from './FreeSlider';
import { Settings, Methods } from './types';

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

    onChange(handler: Function): void {
      $(this).data().freeSlider.method().onChange(handler);
    },

    onLoad(handler: Function): void {
      $(this).data().freeSlider.method().onLoad(handler);
    },
  };

  $.fn.freeSlider = function (
    action?: Partial<Settings> | string,
    args?: number[] | Function
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
