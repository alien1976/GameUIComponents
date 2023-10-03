(()=>{"use strict";const e=new RegExp("^s+|s+$","g"),t=["input","textarea"];function i(e){return t.indexOf(e.tagName.toLowerCase())>-1}window.GUIComponentsDefinedElements={},window.GUIComponentsDefinedElements||(window.GUIComponentsDefinedElements={});class s extends HTMLElement{get instanceType(){return"BaseComponent"}setupTemplate(e,t){if(!this.isConnected)return console.log(`DEBUG: component ${this.tagName} was not initialized because it was disconnected from the DOM!`);this.template=e.template,t(e.template)}isStatePropValid(e,t){const i=this.stateSchema[e];if(!i)return console.error(`A property ${e} does not exist on type ${this.tagName.toLowerCase()}!`),!1;const s=typeof t;return!(!i.type.includes("array")||!Array.isArray(t))||(!!i.type.includes(s)||(console.error(`Property ${e} can not be of type - ${s}. Allowed types are: ${i.type.join(",")}`),!1))}}class r{get instanceType(){return"Validator"}static isFormElement(e){for(e=e.parentElement;e;){if("GAMEFACE-FORM-CONTROL"===e.tagName||"gameface-form-control"===e.tagName)return!0;e=e.parentElement}return!1}static tooLong(){return!1}static tooShort(){return!1}static rangeOverflow(){return!1}static rangeUnderflow(){return!1}static valueMissing(e){return e.hasAttribute("required")&&!e.value}static nameMissing(e){return!e.name&&!e.getAttribute("name")}static isRequired(e){return e.hasAttribute("required")}static customError(){return!1}static willSerialize(e){return!this.nameMissing(e)}static isBadURL(){return!1}static isBadEmail(){return!1}}class n{get instanceType(){return"NativeElementValidator"}constructor(e){this.element=e}isFormElement(){return r.isFormElement(this.element)}tooLong(){return i(this.element)?o.tooLong(this.element):r.tooLong()}tooShort(){return i(this.element)?o.tooShort(this.element):r.tooShort()}rangeOverflow(){return i(this.element)?o.rangeOverflow(this.element):r.rangeOverflow()}rangeUnderflow(){return i(this.element)?o.rangeUnderflow(this.element):r.rangeUnderflow()}valueMissing(){return r.valueMissing(this.element)}nameMissing(){return r.nameMissing(this.element)}customError(){return r.customError()}isRequired(){return r.isRequired(this.element)}willSerialize(){return r.willSerialize(this.element)}isBadEmail(){return!!i(this.element)&&o.isBadEmail(this.element)}isBadURL(){return!!i(this.element)&&o.isBadURL(this.element)}}class a extends s{get instanceType(){return"CustomElementValidator"}isFormElement(){return r.isFormElement(this)}tooLong(){return r.tooLong(this)}tooShort(){return r.tooShort(this)}valueMissing(){return r.valueMissing(this)}nameMissing(){return r.nameMissing(this)}customError(){return r.customError()}isRequired(){return r.isRequired(this)}rangeOverflow(){return r.rangeOverflow(this)}rangeUnderflow(){return r.rangeUnderflow(this)}willSerialize(){return r.willSerialize(this)}isBadEmail(){return r.isBadEmail(this)}isBadURL(){return r.isBadURL(this)}}class o{get instanceType(){return"TextFieldValidator"}static tooLong(e){const t=e.getAttribute("maxlength");return!!t&&e.value.length>parseFloat(t)}static tooShort(e){const t=e.getAttribute("minlength");return!!t&&e.value.length<parseFloat(t)}static rangeOverflow(e){const t=e.getAttribute("max");return!!t&&parseFloat(e.value)>parseFloat(t)}static rangeUnderflow(e){const t=e.getAttribute("min");return!!t&&parseFloat(e.value)<parseFloat(t)}static isBadURL(e){if("url"!==e.getAttribute("type"))return!1;const t=e.pattern||e.getAttribute("pattern");return!!t&&!e.value.match(t)}static isBadEmail(e){return"email"===e.getAttribute("type")&&!e.value.match("@")}}const l=new function(){const t="component-slot",i={DOWN:40,LEFT:37,RIGHT:39,UP:38,HOME:36,END:35,ENTER:13,ESCAPE:27,TAB:9,SHIFT:16,CTRL:17,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,LETTER_A:65},l=new class{constructor(){this.imported=this.imported||[],this.KEYCODES=i,this.cachedComponents={},this.CustomElementValidator=a,this.NativeElementValidator=n,this.TextFieldValidator=o,this.Validator=r,this.BaseComponent=s}importScript(e){const t=document.createElement("script");t.setAttribute("src",e),document.body.appendChild(t)}loadHTML(e){return this.loadResource(e).then((e=>e.template))}whenDefined(e){if(void 0!==window.GUIComponentsDefinedElements[e])return window.GUIComponentsDefinedElements[e].promise;const t=window.GUIComponentsDefinedElements[e]={};return t.promise=new Promise(((e,i)=>{t.resolve=e,t.reject=i})),t.promise}defineCustomElement(e,t){window.GUIComponentsDefinedElements[e]||customElements.get(e)||(this.whenDefined(e),customElements.define(e,t),window.GUIComponentsDefinedElements[e].resolve(t))}importComponent(e){requestAnimationFrame((()=>{this.importScript(e+"/script.js")}))}removeSlashes(e){return e.replace(/[/|\\]/g,"")}removeNewLines(t){return t.replace(e,"").trim()}removeCopyrightNotice(e){return e.replace("\x3c!--Copyright (c) Coherent Labs AD. All rights reserved. Licensed under the MIT License. See License.txt in the project root for license information. --\x3e","").trim()}resolveWithTemplate(e){return new Promise((t=>{t({template:e.template,url:e.url})}))}loadResource(e){if(e.template&&"string"==typeof e.template){if(e.isRendered)return this.resolveWithTemplate(e);const t=this.removeCopyrightNotice(e.template);return new Promise((i=>{i({template:this.removeNewLines(t),url:e.url})}))}if("object"==typeof e.template&&e.isRendered)return this.resolveWithTemplate(e);if(window.__optimize){const t=this.removeSlashes(e.url),i=document.getElementById(t).firstChild;return i?new Promise((t=>{t({template:i.innerHTML,url:e.url})})):this.requestResource(e.url)}return this.requestResource(e.url)}requestResource(e){const t=new XMLHttpRequest,i=new Promise((function(i,s){t.onload=r=>{200==t.status?i({template:t.responseText,url:e}):s(r)},t.onerror=s}));return t.open("GET",e),t.send(),i}findSlots(e,i,s={}){const r=e.children,n=r.length;for(let e=0;e<n;++e){const n=r[e],a=n.tagName.toLowerCase();if("component-slot"===a){const e=n.dataset.name;s[e]||(s[e]=[]),s[e].push(n),this.findSlots(n,i,s)}else if(n.hasAttribute("slot")){const e=n.getAttribute("slot");s[e]||(s[e]=[]),s[e].push(n),this.findSlots(n,i,s)}else("gameface-scrollable-container"===a||a!==t&&i!==a&&!window.GUIComponentsDefinedElements[a])&&this.findSlots(n,i,s)}return s}replaceSlots(e,t){const i=t[0];if(e.length&&i.childNodes.length)for(;i.firstChild;)i.removeChild(i.lastChild);const s=i.parentNode;s.removeChild(i);for(let t=0;t<e.length;++t)s.appendChild(e[t])}transferContent(e,t){for(;t.childNodes.length>0;){const e=t.childNodes;t.removeChild(e[e.length-1])}for(;e.childNodes.length>0;){const i=e.childNodes[0];e.removeChild(i),t.appendChild(i)}}renderOnce(e){return!e.isRendered&&(this.render(e),e.isRendered=!0,!0)}render(e){const t=document.createElement("div");t.innerHTML=e.template;const i=e.tagName.toLowerCase(),s=this.findSlots(t,i),r=this.findSlots(e,i),n=Object.keys(r);if(Object.keys(s).length)for(const e of n)r[e]&&s[e]&&this.replaceSlots(r[e],s[e]);this.transferContent(t,e)}transferChildren(e,t,i){const s=document.createElement("div");s.innerHTML=e.template;const r=s.querySelector(t);i.forEach((e=>r.appendChild(e))),this.transferContent(s,e)}waitForFrames(e=(()=>{}),t=3){if(0===t)return e();t--,requestAnimationFrame((()=>this.waitForFrames(e,t)))}isBrowserGameface(){return navigator.userAgent.match("Cohtml")}};class h extends HTMLElement{constructor(){super(),this.originalAppendChild=this.appendChild,this.originalInsertBefore=this.insertBefore,this.originalReplaceChild=this.replaceChild,this.originalRemoveChild=this.removeChild,this.appendChild=e=>{const t=this.originalAppendChild(e);return this.disptachSlotChange(t),t},this.insertBefore=(e,t)=>{const i=this.originalInsertBefore(e,t);return this.disptachSlotChange(i),i},this.replaceChild=(e,t)=>{const i=this.originalReplaceChild(e,t);return this.disptachSlotChange(i),i},this.removeChild=e=>{const t=this.originalRemoveChild(e);return this.disptachSlotChange(t),t}}disptachSlotChange(e){this.dispatchEvent(new CustomEvent("slotchange"),{target:this,child:e})}}return l.defineCustomElement(t,h),l},h=l.CustomElementValidator;l.defineCustomElement("gameface-checkbox",class extends h{static get observedAttributes(){return["checked","disabled","value","name"]}constructor(){super(),this.template=' <div class="guic-checkbox-wrapper"> <div class="guic-checkbox-wrapper-inner"> <component-slot data-name="checkbox-background"> <div class="guic-checkbox-background"></div> </component-slot> <component-slot data-name="check-mark" style="display:none"> <div class="guic-check-mark"></div> </component-slot> </div> <component-slot data-name="checkbox-label"><span class="guic-checkbox-label">Click me!</span></component-slot> </div> ',this.stateSchema={checked:{type:["boolean"]},disabled:{type:["boolean"]},value:{type:["string"]},name:{type:["string"]}},this.state={checked:!1,disabled:!1,name:"",value:"on"},this.toggleChecked=this.toggleChecked.bind(this),this.url="/components/checkbox/template.html",this.init=this.init.bind(this)}attributeChangedCallback(e,t,i){this.isRendered&&this.updateAttributeState(e,i)}updateAttributeState(e,t){switch(e){case"checked":this.updateCheckedState(null!==t);break;case"disabled":this.updateDisabledState(null!==t);break;case"value":case"name":this.updateState(e,t)}}updateCheckedState(e){this.updateState("checked",e),this.querySelector('[data-name="check-mark"]').style.display=e?"block":"none"}get value(){return this.state.value}set value(e){this.setAttribute("value",e)}get name(){return this.state.name}set name(e){this.setAttribute("name",e)}get checked(){return this.state.checked}set checked(e){e?this.setAttribute("checked",""):this.removeAttribute("checked")}get disabled(){return this.state.disabled}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}updateDisabledState(e){this.updateState("disabled",e),e?(this.firstChild.classList.add("guic-checkbox-disabled"),this.setAttribute("tabindex","-1")):(this.firstChild.classList.remove("guic-checkbox-disabled"),this.setAttribute("tabindex","0"))}updateState(e,t){this.isStatePropValid(e,t)&&(this.state[e]=t)}valueMissing(){return this.hasAttribute("required")&&!this.state.checked}willSerialize(){return!(!this.state.checked||this.nameMissing())}initCheckboxState(){this.hasAttribute("checked")&&this.updateAttributeState("checked",!0),this.hasAttribute("disabled")&&this.updateAttributeState("disabled",!0),this.hasAttribute("value")&&this.updateAttributeState("value",this.getAttribute("value")),this.hasAttribute("name")&&this.updateAttributeState("name",this.getAttribute("name"))}init(e){this.setupTemplate(e,(()=>{l.renderOnce(this),this.addEventListener("click",this.toggleChecked),this.initCheckboxState()}))}connectedCallback(){l.loadResource(this).then(this.init).catch((e=>console.error(e)))}toggleChecked(){this.disabled||(this.checked=!this.state.checked)}})})();