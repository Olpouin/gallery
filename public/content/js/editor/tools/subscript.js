!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Subscript=e():t.Subscript=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}var i=function(){function t(e){var n=e.api;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=n,this.button=null,this.tag="SUB",this.iconClasses={base:this.api.styles.inlineToolButton,active:this.api.styles.inlineToolButtonActive}}return o(t,null,[{key:"CSS",get:function(){}}]),o(t,[{key:"render",value:function(){return this.button=document.createElement("button"),this.button.type="button",this.button.classList.add(this.iconClasses.base),this.button.innerHTML=this.toolboxIcon,this.button}},{key:"surround",value:function(t){if(t){var e=this.api.selection.findParentTag(this.tag);e?this.unwrap(e):this.wrap(t)}}},{key:"wrap",value:function(t){var e=document.createElement(this.tag);e.appendChild(t.extractContents()),t.insertNode(e),this.api.selection.expandToTag(e)}},{key:"unwrap",value:function(t){this.api.selection.expandToTag(t);var e=window.getSelection(),n=e.getRangeAt(0),o=n.extractContents();t.parentNode.removeChild(t),n.insertNode(o),e.removeAllRanges(),e.addRange(n)}},{key:"checkState",value:function(){var t=this.api.selection.findParentTag(this.tag);this.button.classList.toggle(this.iconClasses.active,!!t)}},{key:"toolboxIcon",get:function(){return'<svg width="20" height="20"><path d="M13.605 3.564l-5.143 5.143 5.143 5.143-1.58 1.58-5.143-5.143-5.143 5.143-1.58-1.58 5.143-5.143-5.143-5.143 1.58-1.58 5.143 5.143 5.143-5.143 1.58 1.58zM20.16 18.824h-5.468v-1.12l0.997-0.896c0.852-0.728 1.479-1.333 1.905-1.826 0.415-0.493 0.627-0.952 0.639-1.389 0.011-0.314-0.090-0.571-0.303-0.784-0.202-0.179-0.527-0.314-0.964-0.314-0.347 0-0.65 0.067-0.941 0.202l-0.739 0.426-0.504-1.311c0.303-0.235 0.661-0.437 1.098-0.594s0.919-0.269 1.445-0.269c0.874 0.045 1.546 0.28 1.994 0.739s0.695 1.042 0.695 1.759c-0.011 0.627-0.213 1.21-0.605 1.737-0.381 0.527-0.852 1.031-1.423 1.524l-0.717 0.583v0.022h2.891v1.513z"></path></svg>'}}],[{key:"isInline",get:function(){return!0}},{key:"sanitize",get:function(){return{sub:{}}}}]),t}();t.exports=i}])});