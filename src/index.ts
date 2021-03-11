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

    getState(): Settings {
      return $(this).data().freeSlider.method().getState();
    },

    update(state: Partial<Settings>) {
      return $(this).data().freeSlider.method().update(state);
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
    args?: Partial<Settings> | Function
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
