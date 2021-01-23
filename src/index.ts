import $ from 'jquery';
import FreeSlider from './FreeSlider';
import { Settings, Methods } from './types';

(($) => {
  const methods: Methods = {
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

  $.fn.freeSlider = function (action?: Partial<Settings> | string, args?: number) {
    let method: any;
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

