import $ from 'jquery';
import FreeSlider from './FreeSlider';
import { Settings } from './types';

(($) => {
  const methods = {
    init(options?: Partial<Settings>) {
      return this.each((i: number, node: HTMLElement) => {
        const freeSlider: FreeSlider = new FreeSlider(node, options);

        $(this).data('freeSlider', freeSlider);
      });
    },

    getValue(): number {
      return $(this).data().freeSlider.method().getCurrentValue();
    },

    setValue(value: number): void {
      $(this).data().freeSlider.method().setValue(value);
    }
  };

  $.fn.freeSlider = function (action?: Partial<Settings> | string, args?) {
    let method;
    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, action);
    } else {
      $.error(`Метода ${action} не существует для freeSlider`);
      method = this;
    }

    return method;
  };
})($);

