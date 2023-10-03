(()=>{var __webpack_modules__={915:function(){var NO_JQUERY={};!function(e,t,r){if(!("console"in e)){var n=e.console={};n.log=n.warn=n.error=n.debug=function(){}}t===NO_JQUERY&&(t={fn:{},extend:function(){for(var e=arguments[0],t=1,r=arguments.length;t<r;t++){var n=arguments[t];for(var s in n)e[s]=n[s]}return e}}),t.fn.pm=function(){return console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])"),this},t.pm=e.pm=function(e){s.send(e)},t.pm.bind=e.pm.bind=function(e,t,r,n,i){s.bind(e,t,r,n,!0===i)},t.pm.unbind=e.pm.unbind=function(e,t){s.unbind(e,t)},t.pm.origin=e.pm.origin=null,t.pm.poll=e.pm.poll=200;var s={send:function(e){var r=t.extend({},s.defaults,e),n=r.target;if(r.target)if(r.type){var i={data:r.data,type:r.type};r.success&&(i.callback=s._callback(r.success)),r.error&&(i.errback=s._callback(r.error)),"postMessage"in n&&!r.hash?(s._bind(),n.postMessage(JSON.stringify(i),r.origin||"*")):(s.hash._bind(),s.hash.send(r,i))}else console.warn("postmessage type required");else console.warn("postmessage target window required")},bind:function(e,t,r,n,i){s._replyBind(e,t,r,n,i)},_replyBind:function(r,n,i,o,a){"postMessage"in e&&!o?s._bind():s.hash._bind();var l=s.data("listeners.postmessage");l||(l={},s.data("listeners.postmessage",l));var u=l[r];u||(u=[],l[r]=u),u.push({fn:n,callback:a,origin:i||t.pm.origin})},unbind:function(e,t){var r=s.data("listeners.postmessage");if(r)if(e)if(t){var n=r[e];if(n){for(var i=[],o=0,a=n.length;o<a;o++){var l=n[o];l.fn!==t&&i.push(l)}r[e]=i}}else delete r[e];else for(var o in r)delete r[o]},data:function(e,t){return void 0===t?s._data[e]:(s._data[e]=t,t)},_data:{},_CHARS:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),_random:function(){for(var e=[],t=0;t<32;t++)e[t]=s._CHARS[0|32*Math.random()];return e.join("")},_callback:function(e){var t=s.data("callbacks.postmessage");t||(t={},s.data("callbacks.postmessage",t));var r=s._random();return t[r]=e,r},_bind:function(){s.data("listening.postmessage")||(e.addEventListener?e.addEventListener("message",s._dispatch,!1):e.attachEvent&&e.attachEvent("onmessage",s._dispatch),s.data("listening.postmessage",1))},_dispatch:function(e){try{var t=JSON.parse(e.data)}catch(c){return void console.warn("postmessage data invalid json: ",c)}if(t.type){var r=(s.data("callbacks.postmessage")||{})[t.type];if(r)r(t.data);else for(var n=(s.data("listeners.postmessage")||{})[t.type]||[],i=0,o=n.length;i<o;i++){var a=n[i];if(a.origin&&"*"!==a.origin&&e.origin!==a.origin){if(console.warn("postmessage message origin mismatch",e.origin,a.origin),t.errback){var l={message:"postmessage origin mismatch",origin:[e.origin,a.origin]};s.send({target:e.source,data:l,type:t.errback})}}else try{a.callback?a.fn(t.data,u,e):u(a.fn(t.data,e))}catch(h){if(!t.errback)throw h;s.send({target:e.source,data:h,type:t.errback})}function u(r){t.callback&&s.send({target:e.source,data:r,type:t.callback})}}}else console.warn("postmessage message type required")}};s.hash={send:function(t,r){var n=t.target,i=t.url;if(i){i=s.hash._url(i);var o,a=s.hash._url(e.location.href);if(e==n.parent)o="parent";else try{for(var l=0,u=parent.frames.length;l<u;l++)if(parent.frames[l]==e){o=l;break}}catch(t){o=e.name}if(null!=o){var c={"x-requested-with":"postmessage",source:{name:o,url:a},postmessage:r},h="#x-postmessage-id="+s._random();n.location=i+h+encodeURIComponent(JSON.stringify(c))}else console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list")}else console.warn("postmessage target window url is required")},_regex:/^\#x\-postmessage\-id\=(\w{32})/,_regex_len:50,_bind:function(){s.data("polling.postmessage")||(setInterval((function(){var t=""+e.location.hash,r=s.hash._regex.exec(t);if(r){var n=r[1];s.hash._last!==n&&(s.hash._last=n,s.hash._dispatch(t.substring(s.hash._regex_len)))}}),t.pm.poll||200),s.data("polling.postmessage",1))},_dispatch:function(t){if(t){try{if(!("postmessage"===(t=JSON.parse(decodeURIComponent(t)))["x-requested-with"]&&t.source&&null!=t.source.name&&t.source.url&&t.postmessage))return}catch(p){return}var r=t.postmessage,n=(s.data("callbacks.postmessage")||{})[r.type];if(n)n(r.data);else{var i;i="parent"===t.source.name?e.parent:e.frames[t.source.name];for(var o=(s.data("listeners.postmessage")||{})[r.type]||[],a=0,l=o.length;a<l;a++){var u=o[a];if(u.origin){var c=/https?\:\/\/[^\/]*/.exec(t.source.url)[0];if("*"!==u.origin&&c!==u.origin){if(console.warn("postmessage message origin mismatch",c,u.origin),r.errback){var h={message:"postmessage origin mismatch",origin:[c,u.origin]};s.send({target:i,data:h,type:r.errback,hash:!0,url:t.source.url})}continue}}function d(e){r.callback&&s.send({target:i,data:e,type:r.callback,hash:!0,url:t.source.url})}try{u.callback?u.fn(r.data,d):d(u.fn(r.data))}catch(f){if(!r.errback)throw f;s.send({target:i,data:f,type:r.errback,hash:!0,url:t.source.url})}}}}},_url:function(e){return(""+e).replace(/#.*$/,"")}},t.extend(s,{defaults:{target:null,url:null,type:null,data:null,success:null,error:null,origin:"*",hash:!1}})}(this,"undefined"==typeof jQuery?NO_JQUERY:jQuery),"JSON"in window&&window.JSON||(JSON={}),function(){function f(e){return e<10?"0"+e:e}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(e){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,(function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}function str(e,t){var r,n,s,i,o,a=gap,l=t[e];switch(l&&"object"==typeof l&&"function"==typeof l.toJSON&&(l=l.toJSON(e)),"function"==typeof rep&&(l=rep.call(t,e,l)),typeof l){case"string":return quote(l);case"number":return isFinite(l)?String(l):"null";case"boolean":case"null":return String(l);case"object":if(!l)return"null";if(gap+=indent,o=[],"[object Array]"===Object.prototype.toString.apply(l)){for(i=l.length,r=0;r<i;r+=1)o[r]=str(r,l)||"null";return s=0===o.length?"[]":gap?"[\n"+gap+o.join(",\n"+gap)+"\n"+a+"]":"["+o.join(",")+"]",gap=a,s}if(rep&&"object"==typeof rep)for(i=rep.length,r=0;r<i;r+=1)"string"==typeof(n=rep[r])&&(s=str(n,l))&&o.push(quote(n)+(gap?": ":":")+s);else for(n in l)Object.hasOwnProperty.call(l,n)&&(s=str(n,l))&&o.push(quote(n)+(gap?": ":":")+s);return s=0===o.length?"{}":gap?"{\n"+gap+o.join(",\n"+gap)+"\n"+a+"}":"{"+o.join(",")+"}",gap=a,s}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(e,t){var r,n,s=e[t];if(s&&"object"==typeof s)for(r in s)Object.hasOwnProperty.call(s,r)&&(void 0!==(n=walk(s,r))?s[r]=n:delete s[r]);return reviver.call(e,t,s)}if(cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,(function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(r.exports,r,r.exports,__webpack_require__),r.exports}var __webpack_exports__={};(()=>{"use strict";const e=new RegExp("^s+|s+$","g"),t=["input","textarea"];function r(e){return t.indexOf(e.tagName.toLowerCase())>-1}window.GUIComponentsDefinedElements={},window.GUIComponentsDefinedElements||(window.GUIComponentsDefinedElements={});class n extends HTMLElement{get instanceType(){return"BaseComponent"}setupTemplate(e,t){if(!this.isConnected)return console.log(`DEBUG: component ${this.tagName} was not initialized because it was disconnected from the DOM!`);this.template=e.template,t(e.template)}isStatePropValid(e,t){const r=this.stateSchema[e];if(!r)return console.error(`A property ${e} does not exist on type ${this.tagName.toLowerCase()}!`),!1;const n=typeof t;return!(!r.type.includes("array")||!Array.isArray(t))||(!!r.type.includes(n)||(console.error(`Property ${e} can not be of type - ${n}. Allowed types are: ${r.type.join(",")}`),!1))}}class s{get instanceType(){return"Validator"}static isFormElement(e){for(e=e.parentElement;e;){if("GAMEFACE-FORM-CONTROL"===e.tagName||"gameface-form-control"===e.tagName)return!0;e=e.parentElement}return!1}static tooLong(){return!1}static tooShort(){return!1}static rangeOverflow(){return!1}static rangeUnderflow(){return!1}static valueMissing(e){return e.hasAttribute("required")&&!e.value}static nameMissing(e){return!e.name&&!e.getAttribute("name")}static isRequired(e){return e.hasAttribute("required")}static customError(){return!1}static willSerialize(e){return!this.nameMissing(e)}static isBadURL(){return!1}static isBadEmail(){return!1}}class i{get instanceType(){return"NativeElementValidator"}constructor(e){this.element=e}isFormElement(){return s.isFormElement(this.element)}tooLong(){return r(this.element)?a.tooLong(this.element):s.tooLong()}tooShort(){return r(this.element)?a.tooShort(this.element):s.tooShort()}rangeOverflow(){return r(this.element)?a.rangeOverflow(this.element):s.rangeOverflow()}rangeUnderflow(){return r(this.element)?a.rangeUnderflow(this.element):s.rangeUnderflow()}valueMissing(){return s.valueMissing(this.element)}nameMissing(){return s.nameMissing(this.element)}customError(){return s.customError()}isRequired(){return s.isRequired(this.element)}willSerialize(){return s.willSerialize(this.element)}isBadEmail(){return!!r(this.element)&&a.isBadEmail(this.element)}isBadURL(){return!!r(this.element)&&a.isBadURL(this.element)}}class o extends n{get instanceType(){return"CustomElementValidator"}isFormElement(){return s.isFormElement(this)}tooLong(){return s.tooLong(this)}tooShort(){return s.tooShort(this)}valueMissing(){return s.valueMissing(this)}nameMissing(){return s.nameMissing(this)}customError(){return s.customError()}isRequired(){return s.isRequired(this)}rangeOverflow(){return s.rangeOverflow(this)}rangeUnderflow(){return s.rangeUnderflow(this)}willSerialize(){return s.willSerialize(this)}isBadEmail(){return s.isBadEmail(this)}isBadURL(){return s.isBadURL(this)}}class a{get instanceType(){return"TextFieldValidator"}static tooLong(e){const t=e.getAttribute("maxlength");return!!t&&e.value.length>parseFloat(t)}static tooShort(e){const t=e.getAttribute("minlength");return!!t&&e.value.length<parseFloat(t)}static rangeOverflow(e){const t=e.getAttribute("max");return!!t&&parseFloat(e.value)>parseFloat(t)}static rangeUnderflow(e){const t=e.getAttribute("min");return!!t&&parseFloat(e.value)<parseFloat(t)}static isBadURL(e){if("url"!==e.getAttribute("type"))return!1;const t=e.pattern||e.getAttribute("pattern");return!!t&&!e.value.match(t)}static isBadEmail(e){return"email"===e.getAttribute("type")&&!e.value.match("@")}}const l=new function(){const t="component-slot",r={DOWN:40,LEFT:37,RIGHT:39,UP:38,HOME:36,END:35,ENTER:13,ESCAPE:27,TAB:9,SHIFT:16,CTRL:17,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,LETTER_A:65},l=new class{constructor(){this.imported=this.imported||[],this.KEYCODES=r,this.cachedComponents={},this.CustomElementValidator=o,this.NativeElementValidator=i,this.TextFieldValidator=a,this.Validator=s,this.BaseComponent=n}importScript(e){const t=document.createElement("script");t.setAttribute("src",e),document.body.appendChild(t)}loadHTML(e){return this.loadResource(e).then((e=>e.template))}whenDefined(e){if(void 0!==window.GUIComponentsDefinedElements[e])return window.GUIComponentsDefinedElements[e].promise;const t=window.GUIComponentsDefinedElements[e]={};return t.promise=new Promise(((e,r)=>{t.resolve=e,t.reject=r})),t.promise}defineCustomElement(e,t){window.GUIComponentsDefinedElements[e]||customElements.get(e)||(this.whenDefined(e),customElements.define(e,t),window.GUIComponentsDefinedElements[e].resolve(t))}importComponent(e){requestAnimationFrame((()=>{this.importScript(e+"/script.js")}))}removeSlashes(e){return e.replace(/[/|\\]/g,"")}removeNewLines(t){return t.replace(e,"").trim()}removeCopyrightNotice(e){return e.replace("\x3c!--Copyright (c) Coherent Labs AD. All rights reserved. Licensed under the MIT License. See License.txt in the project root for license information. --\x3e","").trim()}resolveWithTemplate(e){return new Promise((t=>{t({template:e.template,url:e.url})}))}loadResource(e){if(e.template&&"string"==typeof e.template){if(e.isRendered)return this.resolveWithTemplate(e);const t=this.removeCopyrightNotice(e.template);return new Promise((r=>{r({template:this.removeNewLines(t),url:e.url})}))}if("object"==typeof e.template&&e.isRendered)return this.resolveWithTemplate(e);if(window.__optimize){const t=this.removeSlashes(e.url),r=document.getElementById(t).firstChild;return r?new Promise((t=>{t({template:r.innerHTML,url:e.url})})):this.requestResource(e.url)}return this.requestResource(e.url)}requestResource(e){const t=new XMLHttpRequest,r=new Promise((function(r,n){t.onload=s=>{200==t.status?r({template:t.responseText,url:e}):n(s)},t.onerror=n}));return t.open("GET",e),t.send(),r}findSlots(e,r,n={}){const s=e.children,i=s.length;for(let e=0;e<i;++e){const i=s[e],o=i.tagName.toLowerCase();if("component-slot"===o){const e=i.dataset.name;n[e]||(n[e]=[]),n[e].push(i),this.findSlots(i,r,n)}else if(i.hasAttribute("slot")){const e=i.getAttribute("slot");n[e]||(n[e]=[]),n[e].push(i),this.findSlots(i,r,n)}else("gameface-scrollable-container"===o||o!==t&&r!==o&&!window.GUIComponentsDefinedElements[o])&&this.findSlots(i,r,n)}return n}replaceSlots(e,t){const r=t[0];if(e.length&&r.childNodes.length)for(;r.firstChild;)r.removeChild(r.lastChild);const n=r.parentNode;n.removeChild(r);for(let t=0;t<e.length;++t)n.appendChild(e[t])}transferContent(e,t){for(;t.childNodes.length>0;){const e=t.childNodes;t.removeChild(e[e.length-1])}for(;e.childNodes.length>0;){const r=e.childNodes[0];e.removeChild(r),t.appendChild(r)}}renderOnce(e){return!e.isRendered&&(this.render(e),e.isRendered=!0,!0)}render(e){const t=document.createElement("div");t.innerHTML=e.template;const r=e.tagName.toLowerCase(),n=this.findSlots(t,r),s=this.findSlots(e,r),i=Object.keys(s);if(Object.keys(n).length)for(const e of i)s[e]&&n[e]&&this.replaceSlots(s[e],n[e]);this.transferContent(t,e)}transferChildren(e,t,r){const n=document.createElement("div");n.innerHTML=e.template;const s=n.querySelector(t);r.forEach((e=>s.appendChild(e))),this.transferContent(n,e)}waitForFrames(e=(()=>{}),t=3){if(0===t)return e();t--,requestAnimationFrame((()=>this.waitForFrames(e,t)))}isBrowserGameface(){return navigator.userAgent.match("Cohtml")}};class u extends HTMLElement{constructor(){super(),this.originalAppendChild=this.appendChild,this.originalInsertBefore=this.insertBefore,this.originalReplaceChild=this.replaceChild,this.originalRemoveChild=this.removeChild,this.appendChild=e=>{const t=this.originalAppendChild(e);return this.disptachSlotChange(t),t},this.insertBefore=(e,t)=>{const r=this.originalInsertBefore(e,t);return this.disptachSlotChange(r),r},this.replaceChild=(e,t)=>{const r=this.originalReplaceChild(e,t);return this.disptachSlotChange(r),r},this.removeChild=e=>{const t=this.originalRemoveChild(e);return this.disptachSlotChange(t),t}}disptachSlotChange(e){this.dispatchEvent(new CustomEvent("slotchange"),{target:this,child:e})}}return l.defineCustomElement(t,u),l},u=l.KEYCODES,c=l.BaseComponent;class h extends HTMLElement{constructor(){super(),this.previouslyCheckedElement=null}get allButtons(){return Array.from(this.querySelectorAll("radio-button"))}get value(){return this.previouslyCheckedElement&&!this.previouslyCheckedElement.disabled?this.previouslyCheckedElement.value:null}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?(this.classList.add("guic-radio-button-disabled"),this.setAttribute("disabled","")):(this.classList.remove("guic-radio-button-disabled"),this.removeAttribute("disabled"))}valueMissing(){return!this.previouslyCheckedElement||!this.hasAttribute("name")}setCheckedToPreviousItem(e){if(this.disabled)return;const t=e.previousElementSibling;if(t){if(t.disabled)return this.setCheckedToPreviousItem(t);t.checked=!0,t.focus()}}setCheckedToNextItem(e){if(this.disabled)return;const t=e.nextElementSibling;if(t){if(t.disabled)return this.setCheckedToPreviousItem(t);t.checked=!0,t.focus()}}checkButton(e){this.previouslyCheckedElement!==e&&(this.previouslyCheckedElement&&(this.previouslyCheckedElement.isRendered?this.previouslyCheckedElement.removeAttribute("checked"):(this.previouslyCheckedElement.removeAttribute("checked"),this.unCheckButtonState(this.previouslyCheckedElement))),this.setButtonAttributes(e,!0),this.previouslyCheckedElement=e)}unCheckButtonState(e){e&&this.setButtonAttributes(e,!1),e===this.previouslyCheckedElement&&(this.previouslyCheckedElement=null)}handleClick(){this.disabled||this.radioGroup&&this.radioGroup.disabled||(this.checked=!0,this.focus())}handleKeydown(e){switch(e.keyCode){case u.UP:case u.LEFT:this.radioGroup.setCheckedToPreviousItem(this);break;case u.DOWN:case u.RIGHT:this.radioGroup.setCheckedToNextItem(this)}}setButtonRoleAttribute(e){e.setAttribute("role","radio")}attachButtonEventListeners(e){e.addEventListener("click",this.handleClick.bind(e)),e.addEventListener("keydown",this.handleKeydown.bind(e))}setButtonAttributes(e,t){e.setAttribute("tabindex",t?"0":"-1"),e.setAttribute("aria-checked",t?"true":"false"),e.updateState("checked",!!t)}setupButtons(){for(const e of this.allButtons)this.setButtonRoleAttribute(e),this.attachButtonEventListeners(e),this.setButtonAttributes(e),e.hasAttribute("checked")&&this.checkButton(e)}connectedCallback(){this.setAttribute("role","radiogroup"),this.setupButtons(),this.disabled&&this.classList.add("guic-radio-button-disabled"),this.previouslyCheckedElement=this.querySelector('[aria-checked="true"]')}}l.defineCustomElement("radio-button",class extends c{static get observedAttributes(){return["checked","disabled","value"]}constructor(){super(),this.template=' <div class="radio-button"> <component-slot data-name="radio-button-content"></component-slot> <div class="radio-button-text"></div> <div class="before"></div> <div class="after"></div> </div> ',this.textElement=null,this.init=this.init.bind(this),this.stateSchema={checked:{type:["boolean"]},disabled:{type:["boolean"]},value:{type:["string"]}},this.state={checked:!1,disabled:!1,value:"on"}}attributeChangedCallback(e,t,r){this.isRendered&&this.updateAttributeState(e,r)}updateState(e,t){this.isStatePropValid(e,t)&&(this.state[e]=t)}updateAttributeState(e,t){switch(e){case"checked":null!==t?this.radioGroup.checkButton(this):this.radioGroup.unCheckButtonState(this);break;case"disabled":this.updateDisabledState(null!==t);break;case"value":this.updateState(e,t)}}updateDisabledState(e){this.updateState("disabled",e),e?(this.firstChild.classList.add("guic-radio-button-disabled"),this.setAttribute("tabindex","-1")):(this.firstChild.classList.remove("guic-radio-button-disabled"),this.setAttribute("tabindex","0"))}get checked(){return this.state.checked}set checked(e){e?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.state.value}set value(e){this.setAttribute("value",e)}get text(){return this.textElement.textContent}set text(e){this.textElement.textContent=e}get disabled(){return this.state.disabled}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}init(e){let t;const r=this.querySelectorAll('[slot="radio-button-content"]').length;r||(t=this.textContent),this.setupTemplate(e,(()=>{l.renderOnce(this),this.textElement=this.querySelector(".radio-button-text"),r||(this.textElement.textContent=t),this.hasAttribute("checked")&&this.updateAttributeState("checked",!0),this.hasAttribute("disabled")&&this.updateAttributeState("disabled",!0),this.hasAttribute("value")&&this.updateAttributeState("value",this.getAttribute("value"))}))}connectedCallback(){this.radioGroup=this.parentElement,l.loadResource(this).then(this.init).catch((e=>console.error(e)))}}),l.defineCustomElement("gameface-radio-group",h);var d=__webpack_require__(915),p="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==p&&p,f={searchParams:"URLSearchParams"in p,iterable:"Symbol"in p&&"iterator"in Symbol,blob:"FileReader"in p&&"Blob"in p&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in p,arrayBuffer:"ArrayBuffer"in p};if(f.arrayBuffer)var m=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],b=ArrayBuffer.isView||function(e){return e&&m.indexOf(Object.prototype.toString.call(e))>-1};function g(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function y(e){return"string"!=typeof e&&(e=String(e)),e}function v(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return f.iterable&&(t[Symbol.iterator]=function(){return t}),t}function w(e){this.map={},e instanceof w?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function E(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function _(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function C(e){var t=new FileReader,r=_(t);return t.readAsArrayBuffer(e),r}function A(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function S(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:f.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:f.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:f.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():f.arrayBuffer&&f.blob&&(t=e)&&DataView.prototype.isPrototypeOf(t)?(this._bodyArrayBuffer=A(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):f.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||b(e))?this._bodyArrayBuffer=A(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):f.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},f.blob&&(this.blob=function(){var e=E(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?E(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(C)}),this.text=function(){var e,t,r,n=E(this);if(n)return n;if(this._bodyBlob)return e=this._bodyBlob,r=_(t=new FileReader),t.readAsText(e),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},f.formData&&(this.formData=function(){return this.text().then(T)}),this.json=function(){return this.text().then(JSON.parse)},this}w.prototype.append=function(e,t){e=g(e),t=y(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},w.prototype.delete=function(e){delete this.map[g(e)]},w.prototype.get=function(e){return e=g(e),this.has(e)?this.map[e]:null},w.prototype.has=function(e){return this.map.hasOwnProperty(g(e))},w.prototype.set=function(e,t){this.map[g(e)]=y(t)},w.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},w.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),v(e)},w.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),v(e)},w.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),v(e)},f.iterable&&(w.prototype[Symbol.iterator]=w.prototype.entries);var k=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function x(e,t){if(!(this instanceof x))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,s=(t=t||{}).body;if(e instanceof x){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new w(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,s||null==e._bodyInit||(s=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new w(t.headers)),this.method=(n=(r=t.method||this.method||"GET").toUpperCase(),k.indexOf(n)>-1?n:r),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&s)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(s),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==t.cache&&"no-cache"!==t.cache)){var i=/([?&])_=[^&]*/;i.test(this.url)?this.url=this.url.replace(i,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}function T(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),s=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(s))}})),t}function B(e,t){if(!(this instanceof B))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"",this.headers=new w(t.headers),this.url=t.url||"",this._initBody(e)}x.prototype.clone=function(){return new x(this,{body:this._bodyInit})},S.call(x.prototype),S.call(B.prototype),B.prototype.clone=function(){return new B(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new w(this.headers),url:this.url})},B.error=function(){var e=new B(null,{status:0,statusText:""});return e.type="error",e};var O=[301,302,303,307,308];B.redirect=function(e,t){if(-1===O.indexOf(t))throw new RangeError("Invalid status code");return new B(null,{status:t,headers:{location:e}})};var R=p.DOMException;try{new R}catch(e){(R=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),R.prototype.constructor=R}function U(e,t){return new Promise((function(r,n){var s=new x(e,t);if(s.signal&&s.signal.aborted)return n(new R("Aborted","AbortError"));var i=new XMLHttpRequest;function o(){i.abort()}i.onload=function(){var e,t,n={status:i.status,statusText:i.statusText,headers:(e=i.getAllResponseHeaders()||"",t=new w,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var r=e.split(":"),n=r.shift().trim();if(n){var s=r.join(":").trim();t.append(n,s)}})),t)};n.url="responseURL"in i?i.responseURL:n.headers.get("X-Request-URL");var s="response"in i?i.response:i.responseText;setTimeout((function(){r(new B(s,n))}),0)},i.onerror=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},i.ontimeout=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},i.onabort=function(){setTimeout((function(){n(new R("Aborted","AbortError"))}),0)},i.open(s.method,function(e){try{return""===e&&p.location.href?p.location.href:e}catch(t){return e}}(s.url),!0),"include"===s.credentials?i.withCredentials=!0:"omit"===s.credentials&&(i.withCredentials=!1),"responseType"in i&&(f.blob?i.responseType="blob":f.arrayBuffer&&s.headers.get("Content-Type")&&-1!==s.headers.get("Content-Type").indexOf("application/octet-stream")&&(i.responseType="arraybuffer")),!t||"object"!=typeof t.headers||t.headers instanceof w?s.headers.forEach((function(e,t){i.setRequestHeader(t,e)})):Object.getOwnPropertyNames(t.headers).forEach((function(e){i.setRequestHeader(e,y(t.headers[e]))})),s.signal&&(s.signal.addEventListener("abort",o),i.onreadystatechange=function(){4===i.readyState&&s.signal.removeEventListener("abort",o)}),i.send(void 0===s._bodyInit?null:s._bodyInit)}))}U.polyfill=!0,p.fetch||(p.fetch=U,p.Headers=w,p.Request=x,p.Response=B),window.postMessage=function(e){(0,d.pm)({origin:"http://127.0.0.1/:3000",target:window,data:e})}})()})();