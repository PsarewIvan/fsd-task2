!function(){"use strict";var e={119:function(e,t,n){var i=n(5638),r=n.n(i);function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.observers=[]}var t,n,i;return t=e,(n=[{key:"subscribe",value:function(e){if("function"!=typeof e)throw new Error("observer must be a function");if(this.observers.includes((function(t){return t!==e})))throw new Error("observer already in the list");this.observers.push(e)}},{key:"unsubscribe",value:function(e){this.observers=this.observers.filter((function(t){return t!==e}))}},{key:"notify",value:function(e){this.observers.slice(0).forEach((function(t){t(e)}))}}])&&s(t.prototype,n),i&&s(t,i),e}();function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.modelChangedSubject=new o,this.defaultParamSingle={min:0,max:100,value:50,step:1,type:"single"},this.defaultParamRange={min:0,max:100,from:10,to:90,step:1,type:"range"};var n=t&&"range"===t.type,i=t&&!t.hasOwnProperty("type")&&t.from&&t.to;if(n||i){if(t.from>t.to){var r=[t.max,t.min];t.min=r[0],t.max=r[1]}this.setSettings(t,this.defaultParamRange)}else this.setSettings(t,this.defaultParamSingle)}var t,n,i;return t=e,(n=[{key:"setSettings",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.settings;this.settings=a(a({},t),e),this.modelChangedSubject.notify(this.settings)}},{key:"getSettings",value:function(){return this.settings}},{key:"setNewValue",value:function(e,t,n){var i=this.calcValue(e,t);"single"===n&&i!==this.settings.value?this.setSettings({value:i}):"to"===n&&i!==this.settings.to&&i>=this.settings.from?this.setSettings({to:i}):"from"===n&&i!==this.settings.from&&i<=this.settings.to&&this.setSettings({from:i})}},{key:"calcValue",value:function(e,t){var n=this.settings.step,i=e/t*(this.settings.max-this.settings.min)+this.settings.min;return i%n>n/2&&i!==this.settings.max&&i!==this.settings.min&&(i=i+n-i%n),i%n<n/2&&i!==this.settings.max&&i!==this.settings.min&&(i-=i%n),i=this.round(i,5)}},{key:"round",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Math.pow(10,t);return Math.round(n*e)/n}}])&&h(t.prototype,n),i&&h(t,i),e}();function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var m=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.onChange=n.onChange,this.onFinish=n.onFinish,this.type=n.type,this.orientation=n.orientation,this.isFirstChange=!0,this.render(t),this.initSliderElement(),this.updateMinMax(n.min,n.max),this.changeSlider(n)}var t,n,i;return t=e,(n=[{key:"updateView",value:function(e){this.clickOnBarListener(e),"range"===this.type?this.mouseEventRange(e):this.mouseEventSingle(e)}},{key:"changeSlider",value:function(e){this.inputValue="range"===this.type?[e.from,e.to]:[e.value],this.updateInput(),this.orientation?this.updatePinsVertical(e):this.updatePinsHoriz(e),this.onChange&&!this.isFirstChange&&this.onChange(this.inputValue),this.isFirstChange=!1}},{key:"updatePinsHoriz",value:function(e){var t=this,n=function(n,i){return(t.lineElement.offsetWidth-n.offsetWidth)*(i-e.min)/(e.max-e.min)+n.offsetWidth/2};if("range"===this.type){var i=n(this.fromPinElement,e.from),r=n(this.toPinElement,e.to);this.fromPinElement.style.left="".concat(i,"px"),this.toPinElement.style.left="".concat(r,"px"),this.barElement.style.left="".concat(i,"px"),this.barElement.style.width="".concat(r-i,"px")}else{var s=n(this.pinElement,e.value);this.pinElement.style.left="".concat(s,"px"),this.barElement.style.width="".concat(s,"px")}}},{key:"updatePinsVertical",value:function(e){var t=this,n=function(n,i){return(t.lineElement.offsetHeight-n.offsetHeight)*(i-e.min)/(e.max-e.min)+n.offsetHeight/2};if("range"===this.type){var i=n(this.fromPinElement,e.from),r=n(this.toPinElement,e.to);this.fromPinElement.style.top="".concat(i,"px"),this.toPinElement.style.top="".concat(r,"px"),this.barElement.style.top="".concat(i,"px"),this.barElement.style.height="".concat(r-i,"px")}else{var s=n(this.pinElement,e.value);this.pinElement.style.top="".concat(s,"px"),this.barElement.style.height="".concat(s,"px")}}},{key:"render",value:function(e){var t='\n      <input class="free-slider__input" type="text" name="free-slider">\n      <span class="free-slider__model">\n        <span class="free-slider__line"></span>\n        <span class="free-slider__min">0</span>\n        <span class="free-slider__max">100</span>\n      </span>\n      <span class="free-slider__bar"></span>';"range"===this.type?this.html='\n        <span class="free-slider">\n          '.concat(t,'\n          <span class="free-slider__from-handle"></span>\n          <span class="free-slider__to-handle"></span>\n        </span>'):this.html='\n        <span class="free-slider">\n          '.concat(t,'\n          <span class="free-slider__handle"></span>\n        </span>'),this.root=e,this.root.innerHTML=this.html}},{key:"initSliderElement",value:function(){this.inputElement=this.root.querySelector(".free-slider__input"),this.barElement=this.root.querySelector(".free-slider__bar"),this.lineElement=this.root.querySelector(".free-slider__line"),this.minElement=this.root.querySelector(".free-slider__min"),this.maxElement=this.root.querySelector(".free-slider__max"),"range"===this.type?(this.fromPinElement=this.root.querySelector(".free-slider__from-handle"),this.toPinElement=this.root.querySelector(".free-slider__to-handle")):this.pinElement=this.root.querySelector(".free-slider__handle"),"vertical"===this.orientation&&this.root.querySelector(".free-slider").classList.add("free-slider--vertical")}},{key:"updateMinMax",value:function(e,t){this.minElement.innerHTML="".concat(e),this.maxElement.innerHTML="".concat(t)}},{key:"updateInput",value:function(){this.inputElement.value=this.inputValue.join("-"),"range"===this.type?(this.fromPinElement.style.setProperty("--from-input-value",'"'.concat(this.inputValue[0],'"')),this.toPinElement.style.setProperty("--to-input-value",'"'.concat(this.inputValue[1],'"'))):this.pinElement.style.setProperty("--input-value",'"'.concat(this.inputValue[0],'"'))}},{key:"mouseEventRange",value:function(e){this.pinMouseListener(this.fromPinElement,e),this.pinMouseListener(this.toPinElement,e)}},{key:"mouseEventSingle",value:function(e){this.pinMouseListener(this.pinElement,e)}},{key:"pinMouseListener",value:function(e,t){var n=this;e.addEventListener("mousedown",(function(i){i.preventDefault(),n.handlingMouseMotionEvents(i,e,t)})),e.ondragstart=function(){return!1}}},{key:"handlingMouseMotionEvents",value:function(e,t,n){var i,r,s=this;"vertical"===this.orientation?(i=e.clientY-t.getBoundingClientRect().top,r=this.getLineHeight()):(i=e.clientX-t.getBoundingClientRect().left,r=this.getLineWidth());var o=function(e){var o;e.preventDefault(),(o="vertical"===s.orientation?e.clientY-s.lineElement.getBoundingClientRect().top-i:e.clientX-s.lineElement.getBoundingClientRect().left-i)<0&&(o=0),o>r&&(o=r),n(o,r,s.getPinType(t))};document.addEventListener("mousemove",o),document.addEventListener("mouseup",(function e(){document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e),s.onFinish&&s.onFinish(s.inputValue)}))}},{key:"clickOnBarListener",value:function(e){var t=this;this.barElement.style.pointerEvents="none",this.lineElement.addEventListener("mousedown",(function(n){if(n.preventDefault(),t.changePinOnClick(n,e),"range"===t.type){var i=t.getRangeBetweenPins();t.isClickRefersToTheFromPin(n,i)?t.handlingMouseMotionEvents(n,t.fromPinElement,e):t.handlingMouseMotionEvents(n,t.toPinElement,e)}else t.handlingMouseMotionEvents(n,t.pinElement,e)})),this.lineElement.ondragstart=function(){return!1}}},{key:"changePinOnClick",value:function(e,t){var n,i=this.getPinShift(e);if(i<0&&(i=0),i>(n="vertical"===this.orientation?this.getLineHeight():this.getLineWidth())&&(i=n),"range"===this.type){var r=this.getRangeBetweenPins();this.isClickRefersToTheFromPin(e,r)?t(i,n,"from"):t(i,n,"to")}else t(i,n,"single")}},{key:"getLineWidth",value:function(){return"range"===this.type?this.lineElement.offsetWidth-this.fromPinElement.offsetWidth/2-this.toPinElement.offsetWidth/2:this.lineElement.offsetWidth-this.pinElement.offsetWidth}},{key:"getLineHeight",value:function(){return"range"===this.type?this.lineElement.offsetHeight-this.fromPinElement.offsetHeight/2-this.toPinElement.offsetHeight/2:this.lineElement.offsetHeight-this.pinElement.offsetHeight}},{key:"getPinShift",value:function(e){return"vertical"===this.orientation?"range"===this.type?e.clientY-this.lineElement.getBoundingClientRect().top-this.fromPinElement.offsetHeight/2:e.clientY-this.lineElement.getBoundingClientRect().top-this.pinElement.offsetHeight/2:"range"===this.type?e.clientX-this.lineElement.getBoundingClientRect().left-this.fromPinElement.offsetWidth/2:e.clientX-this.lineElement.getBoundingClientRect().left-this.pinElement.offsetWidth/2}},{key:"getPinType",value:function(e){var t;switch(e){case this.fromPinElement:t="from";break;case this.toPinElement:t="to";break;default:t="single"}return t}},{key:"getRangeBetweenPins",value:function(){return"vertical"===this.orientation?this.toPinElement.getBoundingClientRect().top-this.fromPinElement.getBoundingClientRect().top:this.toPinElement.getBoundingClientRect().left-this.fromPinElement.getBoundingClientRect().left}},{key:"isClickRefersToTheFromPin",value:function(e,t){return"vertical"===this.orientation?e.clientY<=this.fromPinElement.getBoundingClientRect().top+t/2:e.clientX<=this.fromPinElement.getBoundingClientRect().left+t/2}}])&&c(t.prototype,n),i&&c(t,i),e}();function p(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var g=function(){function e(t,n){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.model=new f(n),this.view=new m(this.element,this.model.getSettings()),this.view.updateView((function(e,t,n){i.model.setNewValue(e,t,n)})),this.model.modelChangedSubject.subscribe((function(e){i.view.changeSlider(e)}))}var t,n,i;return t=e,(n=[{key:"getCurrentValue",value:function(){return this.model.getSettings().value}},{key:"setValue",value:function(e){this.model.setSettings({value:e})}}])&&p(t.prototype,n),i&&p(t,i),e}();function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var d,y,E=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.freeSlider=new g(t,n)}var t,n,i;return t=e,(n=[{key:"method",value:function(){return this.freeSlider}}])&&v(t.prototype,n),i&&v(t,i),e}();function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}d=r(),y={init:function(e){var t=this;return this.each((function(n,i){var r=new E(i,e);d(t).data("freeSlider",r)}))},getValue:function(){return d(this).data().freeSlider.method().getCurrentValue()},setValue:function(e){d(this).data().freeSlider.method().setValue(e)}},d.fn.freeSlider=function(e,t){var n;if("string"==typeof e&&y[e])n=y[e].call(this,t);else{if("object"!==b(e)&&e)throw new Error("Метода ".concat(e," не существует для freeSlider"));n=y.init.call(this,e)}return n},r()(".slider").freeSlider({min:-100,max:-80,value:-90,step:.1}),r()(".slider--range").freeSlider({type:"range",min:-100,max:300,from:30,to:100,step:2}),r()(".slider--vertical").freeSlider({orientation:"vertical",min:0,max:100,value:30,step:1}),r()(".slider--vertical--range").freeSlider({orientation:"vertical",type:"range",min:-100,max:100,from:0,to:50,step:5})}},t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.m=e,n.x=function(){},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={179:0},t=[[1202,453],[119,453]],i=function(){},r=function(r,s){for(var o,l,a=s[0],u=s[1],h=s[2],f=s[3],c=0,m=[];c<a.length;c++)l=a[c],n.o(e,l)&&e[l]&&m.push(e[l][0]),e[l]=0;for(o in u)n.o(u,o)&&(n.m[o]=u[o]);for(h&&h(n),r&&r(s);m.length;)m.shift()();return f&&t.push.apply(t,f),i()},s=self.webpackChunk=self.webpackChunk||[];function o(){for(var i,r=0;r<t.length;r++){for(var s=t[r],o=!0,l=1;l<s.length;l++){var a=s[l];0!==e[a]&&(o=!1)}o&&(t.splice(r--,1),i=n(n.s=s[0]))}return 0===t.length&&(n.x(),n.x=function(){}),i}s.forEach(r.bind(null,0)),s.push=r.bind(null,s.push.bind(s));var l=n.x;n.x=function(){return n.x=l||function(){},(i=o)()}}(),n.x()}();