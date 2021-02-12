import $ from 'jquery';
import FreeSlider from './FreeSlider';
import { Settings, Methods } from './types';

(($) => {
  const methods: Methods = {
    init(options?: Partial<Settings>): JQuery {
      return this.each((i: number, node: HTMLElement) => {
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

    onChange(values: number[], handler: number): void {
      $(this).data().freeSlider.method().onChange(values, handler);
    },
  };

  $.fn.freeSlider = function (
    action?: Partial<Settings> | string,
    args?: number[]
  ): number[] | void | JQuery {
    let method: number[] | void | JQuery;
    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, action);
    } else {
      throw new Error(`Метода ${action} не существует для freeSlider`);
    }
    return method;
  };
})($);
