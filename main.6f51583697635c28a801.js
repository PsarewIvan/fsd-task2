!function(){"use strict";var t={3933:function(t,e,n){var r=n(5638),i=n.n(r);function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.observers={}}var e,n,r;return e=t,(n=[{key:"subscribe",value:function(t,e){if("function"!=typeof e)throw new Error("observer must be a function");if("string"!=typeof t)throw new Error("observer title must be a string type");if(this.observers.hasOwnProperty(t))throw new Error('observer "'.concat(t,'" already in the list in'));this.observers[t]=e}},{key:"unsubscribe",value:function(t){if(!this.observers.hasOwnProperty(t))throw new Error('An accepted function "'.concat(t,'" does not exist'));delete this.observers.name}},{key:"notify",value:function(t,e){this.observers[t]&&this.observers[t](e)}}])&&o(e.prototype,n),r&&o(e,r),t}(),s=n(8784),u=n.n(s);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.modelChangedSubject=new a;var n={min:0,max:100,step:1,orientation:"horizontal",tooltips:!0,scale:!1,hints:!0,scaleMark:4,subScaleMark:5,percents:[]};n="range"===e.type?l(l({},n),{values:[10,90],type:"range"}):l(l({},n),{values:[50],type:"single"}),e.values.forEach((function(t,n){t<e.min&&(e.values[n]=e.min),t>e.max&&(e.values[n]=e.max)})),this.setSettings(e,n)}var e,n,r;return e=t,(n=[{key:"updateModel",value:function(t){t.values&&this.updateValues(t.values),"number"==typeof t.step&&this.updateStep(t.step),"number"==typeof t.min&&this.updateMin(t.min),"number"==typeof t.max&&this.updateMax(t.max),"boolean"==typeof t.scale&&this.setSettings({scale:t.scale})}},{key:"updateValues",value:function(t){var e=this,n=t.slice().sort((function(t,e){return t-e})),r=this.isEqual(t,n),i=!this.isEqual(t,this.settings.values),o=!t.some((function(t){return t<e.settings.min||t>e.settings.max}));r&&i&&o&&(this.setSettings({values:t}),this.modelChangedSubject.notify("onChange",this.getSettings()))}},{key:"updateStep",value:function(t){t<0&&(t=0),t>this.settings.max-this.settings.min&&(t=this.settings.max-this.settings.min),this.setSettings({step:t})}},{key:"updateMin",value:function(t){t>=this.settings.values[0]&&(t=this.settings.values[0]),this.setSettings({min:t})}},{key:"updateMax",value:function(t){t<=this.settings.values[this.settings.values.length-1]&&(t=this.settings.values[this.settings.values.length-1]),this.setSettings({max:t})}},{key:"setSettings",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.settings;this.settings=l(l({},e),t),this.modelChangedSubject.notify("viewUpdate",this.getSettings())}},{key:"getSettings",value:function(){var t=this,e=u().cloneDeep(this.settings),n=this.settings.max-this.settings.min;return this.settings.values.forEach((function(r,i){e.percents[i]=(r-t.settings.min)/n})),e}},{key:"setNewValue",value:function(t,e){var n=this.calcValue(t);if("single"===this.settings.type)this.updateModel({values:[n]});else{var r=this.arrCopy(this.settings.values);r[e]=n,this.updateModel({values:r})}}},{key:"calcValue",value:function(t){var e=this.settings.step,n=this.settings.min+(this.settings.max-this.settings.min)*t;return n%e>e/2&&n!==this.settings.max&&n!==this.settings.min&&(n=n+e-n%e),n%e<e/2&&n!==this.settings.max&&n!==this.settings.min&&(n-=n%e),n=this.round(n,5)}},{key:"round",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Math.pow(10,e);return Math.round(n*t)/n}},{key:"isEqual",value:function(t,e){return t.length===e.length&&t.join()===e.join()}},{key:"arrCopy",value:function(t){var e=[];return t.forEach((function(t,n){e[n]=t})),e}}])&&h(e.prototype,n),r&&h(e,r),t}();function d(t){return function(t){if(Array.isArray(t))return v(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var b=function(){function t(e,n,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.orientation=r,this.root=this.create("span",n,i),e.append(this.root)}var e,n,r;return e=t,(n=[{key:"create",value:function(t,e,n){var r,i=document.createElement(t);return(r=i.classList).add.apply(r,d(e)),n&&(i.innerHTML=n),i}},{key:"distanceToScreen",get:function(){return this.root.getBoundingClientRect()[this.directionType]}},{key:"size",get:function(){return this.root[this.offsetSize]}},{key:"directionType",get:function(){return"horizontal"===this.orientation?"left":"top"}},{key:"sizeType",get:function(){return"horizontal"===this.orientation?"width":"height"}},{key:"offsetSize",get:function(){return"horizontal"===this.orientation?"offsetWidth":"offsetHeight"}},{key:"coordType",get:function(){return"horizontal"===this.orientation?"clientX":"clientY"}}])&&y(e.prototype,n),r&&y(e,r),t}();function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function S(t,e){return(S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=E(t);if(e){var i=E(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return k(this,n)}}function k(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var _=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}(o,t);var e,n,r,i=w(o);function o(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),(n=i.call(this,t,["free-slider__track"],e.orientation)).state=e,n}return e=o,(n=[{key:"getDistanceToScreen",value:function(){return this.root.getBoundingClientRect()[this.directionType]}},{key:"clickEvent",value:function(t){var e=this;this.root.addEventListener("pointerdown",(function(n){n.preventDefault(),t(n[e.coordType],n)}))}}])&&g(e.prototype,n),r&&g(e,r),o}(b);function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){return(x=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function T(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=M(t);if(e){var i=M(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return j(this,n)}}function j(t,e){return!e||"object"!==O(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function M(t){return(M=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var P=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&x(t,e)}(n,t);var e=T(n);function n(t,r){var i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),(i=e.call(this,t,["free-slider__rail"],r.orientation)).state=r,i}return n}(b);function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var L=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.state=n,this.render(e)}var e,n,r;return e=t,(n=[{key:"render",value:function(t){"range"===this.state.type?this.thumbs=[new b(t,["free-slider__thumb"],this.state.orientation),new b(t,["free-slider__thumb","free-slider__thumb--second"],this.state.orientation)]:this.thumbs=[new b(t,["free-slider__thumb"],this.state.orientation)]}},{key:"update",value:function(t,e){this.updatePosition(t),this.state.hints&&this.updateHints(e)}},{key:"updatePosition",value:function(t){this.thumbs.forEach((function(e,n){e.root.style[e.directionType]="".concat(100*t[n],"%")}))}},{key:"updateHints",value:function(t){var e=["--input-value-first","--input-value-second"];this.thumbs.forEach((function(n,r){n.root.style.setProperty(e[r],'"'.concat(t[r],'"'))}))}},{key:"addMouseListener",value:function(t,e){var n=this;this.thumbs.forEach((function(r){n.mouseListener(r,t,e)}))}},{key:"mouseListener",value:function(t,e,n){var r=this;t.root.addEventListener("pointerdown",(function(i){i.preventDefault(),r.mouseMoveEvent(t,i,e,n)})),t.root.ondragstart=function(){return!1}}},{key:"mouseMoveEvent",value:function(t,e,n,r){var i=this,o=e[t.coordType]-t.distanceToScreen-this.getThumbSize()/2,a=function(e){e.preventDefault();var r=i.getCurrentThumbIndex(t),a=e[t.coordType]-o;n(a,r)};document.addEventListener("pointermove",a),document.addEventListener("pointerup",(function t(){r(),document.removeEventListener("pointermove",a),document.removeEventListener("pointerup",t)}))}},{key:"getCurrentThumbIndex",value:function(t){return this.thumbs.findIndex((function(e){return e.root===t.root}))}},{key:"requiredThumb",value:function(t){var e={index:0,root:this.thumbs[0]};if("single"===this.state.type)return e;var n=this.thumbs[1].distanceToScreen-this.thumbs[0].distanceToScreen;return t>this.thumbs[0].distanceToScreen+n/2&&(e.index=1,e.root=this.thumbs[1]),e}},{key:"getThumbSize",value:function(){return this.thumbs[0].size}}])&&C(e.prototype,n),r&&C(e,r),t}();function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function z(t,e){return(z=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function V(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=A(t);if(e){var i=A(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return D(this,n)}}function D(t,e){return!e||"object"!==R(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var H=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&z(t,e)}(o,t);var e,n,r,i=V(o);function o(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),(n=i.call(this,t,["free-slider__bar"],e.orientation)).state=e,n.root.style.pointerEvents="none",n}return e=o,(n=[{key:"update",value:function(t){"range"===this.state.type?(this.root.style[this.directionType]="".concat(100*t[0],"%"),this.root.style[this.sizeType]="".concat(100*(t[1]-t[0]),"%")):this.root.style[this.sizeType]="".concat(100*t[0],"%")}}])&&I(e.prototype,n),r&&I(e,r),o}(b);function F(t){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function N(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function U(t,e){return(U=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=B(t);if(e){var i=B(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return W(this,n)}}function W(t,e){return!e||"object"!==F(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function B(t){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var X=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&U(t,e)}(o,t);var e,n,r,i=q(o);function o(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),(n=i.call(this,t,["free-slider__scale"],e.orientation)).state=e,n}return e=o,(n=[{key:"render",value:function(t){this.clearRoot();for(var e=t.scaleMark*t.subScaleMark,n=(t.max-t.min)/(t.scaleMark*t.subScaleMark),r=0;r<=e;r+=1)this.renderMark(e,r,t.subScaleMark),this.renderTick(e,t.subScaleMark,r,n,t.min)}},{key:"renderMark",value:function(t,e,n){var r=document.createElement("span");r.classList.add("free-slider__scale-mark"),r.style[this.directionType]="".concat(100*e/t,"%"),e%n==0&&r.classList.add("free-slider__scale-mark--big"),this.root.append(r)}},{key:"renderTick",value:function(t,e,n,r,i){if(n%e==0){var o=document.createElement("span");o.classList.add("free-slider__scale-text"),o.style[this.directionType]="".concat(100*n/t,"%");var a=this.round(r*n+i,5);o.innerHTML=a.toString(),this.root.append(o)}}},{key:"clearRoot",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.root.innerHTML="",this.root.style.display=t?"none":"block"}},{key:"clickEvent",value:function(t){var e=this;this.root.addEventListener("pointerdown",(function(n){n.preventDefault(),t(n[e.coordType],n)}))}},{key:"round",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Math.pow(10,e);return Math.round(n*t)/n}}])&&N(e.prototype,n),r&&N(e,r),o}(b);function Y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var $=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.state=n,this.render(e)}var e,n,r;return e=t,(n=[{key:"render",value:function(t){this.min=new b(t,["free-slider__min"],this.state.orientation,"".concat(this.state.min)),this.max=new b(t,["free-slider__max"],this.state.orientation,"".concat(this.state.max))}},{key:"update",value:function(t,e){this.min.root.innerHTML=t.toString(),this.max.root.innerHTML=e.toString()}}])&&Y(e.prototype,n),r&&Y(e,r),t}();function G(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var J=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=e,this.onChange=n.onChange,this.onUpdate=n.onUpdate,this.isFirstChange=!0,this.createWrapper(n.orientation),this.render(n),this.update(n)}var e,n,r;return e=t,(n=[{key:"render",value:function(t){this.track=new _(this.slider,t),this.rail=new P(this.slider,t),this.bar=new H(this.slider,t),this.thumbs=new L(this.rail.root,t),this.scale=new X(this.rail.root,t),t.tooltips&&(this.tooltips=new $(this.slider,t))}},{key:"createWrapper",value:function(t){this.slider=document.createElement("span"),"vertical"===t?this.slider.classList.add("free-slider","free-slider--vertical"):"horizontal"===t&&this.slider.classList.add("free-slider","free-slider--horizontal"),this.root.append(this.slider)}},{key:"update",value:function(t){this.thumbs.update(t.percents,t.values),this.bar.update(this.formatPercents(t.percents)),this.updateScale(t),this.tooltips&&this.tooltips.update(t.min,t.max),this.onUpdate&&this.isFirstChange&&(this.onUpdate(t.values),this.isFirstChange=!1),this.onChange&&!this.isFirstChange&&this.onChange(t.values)}},{key:"updateScale",value:function(t){t.scale&&this.scale.render(t),t.scale||this.scale.clearRoot(!0)}},{key:"viewChanged",value:function(t,e){var n=this;this.thumbs.addMouseListener((function(e,r){var i=n.percentFromThumbShift(e);t(i,r)}),e),this.track.clickEvent((function(r,i){n.clickHandler(r,t,i,e)})),this.scale&&this.scale.clickEvent((function(r,i){n.clickHandler(r,t,i,e)}))}},{key:"clickHandler",value:function(t,e,n,r){var i=this,o=this.percentFromThumbShift(t),a=this.thumbs.requiredThumb(t);e(o,a.index),this.thumbs.mouseMoveEvent(a.root,n,(function(t){var n=i.percentFromThumbShift(t);e(n,a.index)}),r)}},{key:"percentFromThumbShift",value:function(t){var e=this.rail.size,n=(t-this.rail.distanceToScreen)/e;return n<=0&&(n=0),n>=1&&(n=1),n}},{key:"formatPercents",value:function(t){var e=this.track.size,n=this.thumbs.getThumbSize(),r=(e-n)/e,i=n/e/2,o=[];return t.forEach((function(t){o.push(t*r+i)})),o}}])&&G(e.prototype,n),r&&G(e,r),t}();function K(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var Q=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=e,this.model=new p(n),this.view=new J(this.element,this.model.getSettings()),this.view.viewChanged((function(t,e){r.model.setNewValue(t,e)}),(function(){n.onFinish&&n.onFinish(r.model.getSettings().values)})),this.model.modelChangedSubject.subscribe("viewUpdate",(function(t){r.view.update(t)}))}var e,n,r;return e=t,(n=[{key:"getCurrentValue",value:function(){return this.model.getSettings().values}},{key:"setValue",value:function(t){var e=this.model.getSettings().values;e.forEach((function(n,r){"number"==typeof t[r]&&n!==t[r]&&(e[r]=t[r])})),this.model.updateModel({values:e})}},{key:"onChange",value:function(t){this.model.modelChangedSubject.subscribe("onChange",(function(e){t&&t(e)}))}},{key:"onLoad",value:function(t){t(this.model.getSettings())}},{key:"getState",value:function(){return this.model.getSettings()}},{key:"changeStep",value:function(t){this.model.updateModel({step:t})}},{key:"changeMin",value:function(t){this.model.updateModel({min:t})}},{key:"changeMax",value:function(t){this.model.updateModel({max:t})}},{key:"changeScale",value:function(){var t=this.model.getSettings().scale;this.model.updateModel({scale:!t})}}])&&K(e.prototype,n),r&&K(e,r),t}();function Z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var tt,et,nt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.freeSlider=new Q(e,n)}var e,n,r;return e=t,(n=[{key:"method",value:function(){return this.freeSlider}}])&&Z(e.prototype,n),r&&Z(e,r),t}();function rt(t){return(rt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function it(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}tt=i(),et={init:function(t){var e=this;return this.each((function(n,r){var i=new nt(r,t);tt(e).data("freeSlider",i)}))},getValue:function(){return tt(this).data().freeSlider.method().getCurrentValue()},setValue:function(t){tt(this).data().freeSlider.method().setValue(t)},getState:function(){return tt(this).data().freeSlider.method().getState()},changeStep:function(t){return tt(this).data().freeSlider.method().changeStep(t)},changeMin:function(t){return tt(this).data().freeSlider.method().changeMin(t)},changeMax:function(t){return tt(this).data().freeSlider.method().changeMax(t)},changeScale:function(){return tt(this).data().freeSlider.method().changeScale()},onChange:function(t){tt(this).data().freeSlider.method().onChange(t)},onLoad:function(t){tt(this).data().freeSlider.method().onLoad(t)}},tt.fn.freeSlider=function(t,e){if("string"==typeof t&&et[t])return et[t].call(this,e);if("object"!==rt(t)&&t)throw new Error("Метода ".concat(t," не существует для freeSlider"));return et.init.call(this,t)};var ot=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=document.createElement("div"),this.root.classList.add("slider__input-wrapper"),this.elements=[],n.values.forEach((function(t,e){var i=r.createLabel(e);r.elements.push(r.createInput(e)),r.updateAttribute(n),i.append(r.elements[e]),r.root.append(i)})),e.after(this.root)}var e,n,r;return e=t,(n=[{key:"createInput",value:function(t){var e=document.createElement("input");return e.classList.add("slider__input"),e.type="number",e}},{key:"createLabel",value:function(t){var e=document.createElement("label");return e.classList.add("slider__label","slider__label--thumb"),e.innerHTML="Thumb ".concat(t+1,": "),e}},{key:"updateInput",value:function(t){this.updateValue(t.values),this.updateAttribute(t)}},{key:"updateValue",value:function(t){var e=this;t.forEach((function(t,n){e.elements[n].value="".concat(t)}))}},{key:"updateAttribute",value:function(t){var e=this;this.elements.forEach((function(n,r){n.max=e.elements[r+1]?t.values[r+1].toString():t.max.toString(),n.min=e.elements[r-1]&&r>0?t.values[r-1].toString():t.min.toString(),n.step=t.step.toString()}))}},{key:"addEvent",value:function(t){this.elements.forEach((function(e,n){e.addEventListener("change",(function(){var r=[];r[n]=Number(e.value),t(r)}))}))}}])&&it(e.prototype,n),r&&it(e,r),t}();function at(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var st=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=document.createElement("input"),this.root.classList.add("slider__input-step"),this.root.type="number",this.root.min="0",this.root.max=(n.max-n.min).toString(),this.root.value=n.step.toString();var r=document.createElement("label");r.classList.add("slider__label","slider__label--step"),r.innerHTML="Step: ",r.append(this.root),e.after(r)}var e,n,r;return e=t,(n=[{key:"addEvent",value:function(t){var e=this;this.root.addEventListener("change",(function(){t(Number(e.root.value))}))}}])&&at(e.prototype,n),r&&at(e,r),t}();function ut(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var ct=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=document.createElement("input"),this.root.classList.add("slider__input-min"),this.root.type="number",this.root.value=n.min.toString(),this.updateAttribute(n.values);var r=document.createElement("label");r.classList.add("slider__label","slider__label--min"),r.innerHTML="Min: ",r.append(this.root),e.after(r)}var e,n,r;return e=t,(n=[{key:"addEvent",value:function(t){var e=this;this.root.addEventListener("change",(function(){Number(e.root.value)>Number(e.root.max)&&(e.root.value=e.root.max),t(Number(e.root.value))}))}},{key:"updateAttribute",value:function(t){this.root.max=t[0].toString()}}])&&ut(e.prototype,n),r&&ut(e,r),t}();function lt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var ft=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=document.createElement("input"),this.root.classList.add("slider__input-max"),this.root.type="number",this.root.value=n.max.toString(),this.updateAttribute(n.values);var r=document.createElement("label");r.classList.add("slider__label","slider__label--max"),r.innerHTML="Max: ",r.append(this.root),e.after(r)}var e,n,r;return e=t,(n=[{key:"addEvent",value:function(t){var e=this;this.root.addEventListener("change",(function(){Number(e.root.value)<Number(e.root.min)&&(e.root.value=e.root.min),t(Number(e.root.value))}))}},{key:"updateAttribute",value:function(t){this.root.min=t[t.length-1].toString()}}])&&lt(e.prototype,n),r&&lt(e,r),t}();function ht(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var pt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=document.createElement("input"),this.root.classList.add("slider__input-step"),this.root.type="checkbox",this.root.checked=n.scale;var r=document.createElement("label");r.classList.add("slider__label","slider__label--scale"),r.innerHTML="Scale: ",r.append(this.root),e.after(r)}var e,n,r;return e=t,(n=[{key:"addEvent",value:function(t){this.root.addEventListener("change",(function(){t()}))}}])&&ht(e.prototype,n),r&&ht(e,r),t}();function dt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var vt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.slider=e,this.slider.freeSlider(n),this.updateState(),this.scaleCheck=new pt(this.slider,this.state),this.maxInput=new ft(this.slider,this.state),this.minInput=new ct(this.slider,this.state),this.stepInput=new st(this.slider,this.state),this.valuesInputs=new ot(this.slider,this.state),this.inputEvent(),this.updateInputs(),this.updateStep(),this.updateMin(),this.updateMax(),this.updateScale()}var e,n,r;return e=t,(n=[{key:"inputEvent",value:function(){this.slider.freeSlider("onLoad",this.updateElements.bind(this)),this.slider.freeSlider("onChange",this.updateElements.bind(this))}},{key:"updateElements",value:function(t){this.updateState(t),this.minInput.updateAttribute(this.state.values),this.maxInput.updateAttribute(this.state.values),this.valuesInputs.updateInput(this.state)}},{key:"updateState",value:function(t){this.state=t||this.slider.freeSlider("getState")}},{key:"updateInputs",value:function(){this.valuesInputs.addEvent(this.setValues.bind(this))}},{key:"updateStep",value:function(){this.stepInput.addEvent(this.changeStep.bind(this))}},{key:"updateMin",value:function(){this.minInput.addEvent(this.changeMin.bind(this))}},{key:"updateMax",value:function(){this.maxInput.addEvent(this.changeMax.bind(this))}},{key:"updateScale",value:function(){this.scaleCheck.addEvent(this.changeScale.bind(this))}},{key:"changeStep",value:function(t){this.slider.freeSlider("changeStep",t)}},{key:"changeMin",value:function(t){this.slider.freeSlider("changeMin",t)}},{key:"changeMax",value:function(t){this.slider.freeSlider("changeMax",t)}},{key:"changeScale",value:function(){this.slider.freeSlider("changeScale")}},{key:"getValues",value:function(){return this.slider.freeSlider("getValue")}},{key:"setValues",value:function(t){this.slider.freeSlider("setValue",t)}}])&&dt(e.prototype,n),r&&dt(e,r),t}();new vt(i()("#slider-1"),{min:300,max:500,values:[400],step:.1,scale:!0,scaleMark:10,subScaleMark:5}),new vt(i()("#slider-2"),{type:"range",min:-100,max:300,values:[30,100],step:10,scale:!0}),new vt(i()("#slider-3"),{orientation:"vertical",min:0,max:100,values:[30],step:1,scale:!0,hints:!1,tooltips:!1}),new vt(i()("#slider-4"),{orientation:"vertical",type:"range",min:-100,max:100,values:[0,50],step:5})}},e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=t,n.x=function(){},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},function(){var t={179:0},e=[[1202,577],[3933,577]],r=function(){},i=function(i,o){for(var a,s,u=o[0],c=o[1],l=o[2],f=o[3],h=0,p=[];h<u.length;h++)s=u[h],n.o(t,s)&&t[s]&&p.push(t[s][0]),t[s]=0;for(a in c)n.o(c,a)&&(n.m[a]=c[a]);for(l&&l(n),i&&i(o);p.length;)p.shift()();return f&&e.push.apply(e,f),r()},o=self.webpackChunk=self.webpackChunk||[];function a(){for(var r,i=0;i<e.length;i++){for(var o=e[i],a=!0,s=1;s<o.length;s++){var u=o[s];0!==t[u]&&(a=!1)}a&&(e.splice(i--,1),r=n(n.s=o[0]))}return 0===e.length&&(n.x(),n.x=function(){}),r}o.forEach(i.bind(null,0)),o.push=i.bind(null,o.push.bind(o));var s=n.x;n.x=function(){return n.x=s||function(){},(r=a)()}}(),n.x()}();