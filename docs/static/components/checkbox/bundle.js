/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./components/checkbox/demo/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/checkbox/demo/demo.js":
/*!******************************************!*\
  !*** ./components/checkbox/demo/demo.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var coherent_gameface_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! coherent-gameface-components */ \"./components/checkbox/node_modules/coherent-gameface-components/components.js\");\n/* harmony import */ var _umd_checkbox_development_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../umd/checkbox.development.js */ \"./components/checkbox/umd/checkbox.development.js\");\n/* harmony import */ var _umd_checkbox_development_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_umd_checkbox_development_js__WEBPACK_IMPORTED_MODULE_1__);\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Coherent Labs AD. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./components/checkbox/demo/demo.js?");

/***/ }),

/***/ "./components/checkbox/node_modules/coherent-gameface-components/components.js":
/*!*************************************************************************************!*\
  !*** ./components/checkbox/node_modules/coherent-gameface-components/components.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Coherent Labs AD. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nconst newLinesRegExp = new RegExp('^\\s+|\\s+$', 'g');\r\n\r\nconst components = function () {\r\n    const GF_COMPONENT_SLOT_TAG_NAME = 'component-slot';\r\n    const KEYCODES = {\r\n        DOWN: 40,\r\n        LEFT: 37,\r\n        RIGHT: 39,\r\n        UP: 38,\r\n        HOME: 36,\r\n        END: 35,\r\n        ENTER: 13,\r\n        ESCAPE: 27,\r\n        TAB: 9,\r\n        SHIFT: 16,\r\n        CTRL: 17,\r\n        SPACE: 32,\r\n    };\r\n\r\n    class GamefaceComponents {\r\n        constructor() {\r\n            this.definedElements = {};\r\n            this.imported = this.imported || [];\r\n            this.KEYCODES = KEYCODES;\r\n        }\r\n\r\n        /**\r\n         * Create and add a script tag with given url.\r\n         * @param {string} script\r\n        */\r\n        importScript(url) {\r\n            let script = document.createElement('script');\r\n            script.setAttribute('src', url);\r\n            document.body.appendChild(script);\r\n        }\r\n\r\n        /**\r\n         * Loads an html by given url.\r\n         * @param {string} url\r\n         * @returns {promise} resolved with the html as text.\r\n        */\r\n        loadHTML(url) {\r\n            return this.loadResource(url).then((result) => {\r\n                return result.template;\r\n            });\r\n        }\r\n\r\n        /**\r\n         * Creates a promise which resolves when a custom element was defined.\r\n         * Saves the promise for each defined component.\r\n         * @param {string} name - the name of the custom element\r\n         * @returns {promise} - the previously saved promise it any or a new one\r\n        */\r\n        whenDefined(name) {\r\n            if (this.definedElements[name] !== undefined) {\r\n                return this.definedElements[name].promise;\r\n            }\r\n\r\n            const defined = this.definedElements[name] = {};\r\n            defined.promise = new Promise((resolve, reject) => {\r\n                defined.resolve = resolve;\r\n                defined.reject = reject;\r\n            });\r\n            return defined.promise;\r\n        }\r\n\r\n        /**\r\n         * Defines a custom element.\r\n         * @param {string} name - the name of the element.\r\n         * @param {Object} element - the object which describes the element.\r\n        */\r\n        defineCustomElement(name, element) {\r\n            if(this.definedElements[name]) return;\r\n            this.whenDefined(name);\r\n            customElements.define(name, element);\r\n            this.definedElements[name].resolve(element);\r\n        }\r\n\r\n        /**\r\n         * Imports a component by given url.\r\n         * It will automatically try to import style.css and script.js if these\r\n         * files' names were not explicitly specified.\r\n         * @param {string} url - the url of the component\r\n        */\r\n        importComponent(url) {\r\n            requestAnimationFrame(() => {\r\n                this.importScript(url + '/script.js');\r\n            })\r\n        }\r\n\r\n        removeSlashes(path) {\r\n            return path.replace(/[/|\\\\]/g, '');\r\n        }\r\n\r\n        /**\r\n         * Remove new lines from the beginning of templates,\r\n         * because template.firstChild.cloneNode will clone an empty\r\n         * string and will return an empty template.\r\n        */\r\n        removeNewLines(template) {\r\n            return template.replace(newLinesRegExp, '').trim();\r\n        }\r\n\r\n        /**\r\n         * Removes the copyright notice from the template\r\n         * @param {string} template\r\n         * @returns {string} the template without the copyright notice\r\n        */\r\n        removeCopyrightNotice(template) {\r\n            return template.replace('<!--Copyright (c) Coherent Labs AD. All rights reserved. -->', '').trim();\r\n        }\r\n\r\n        /**\r\n         * Used when the element has already been rendered.\r\n         * Return the already rendered template instead of\r\n         * loading and slotting its elements.\r\n         *\r\n         * @param {HTMLElement} component - the component that was rendered\r\n         * @returns {Promise<HTMLElement>} - a promise that will resolve with the rendered template\r\n        */\r\n        resolveWithTemplate(component) {\r\n            return new Promise((resolve) => {\r\n                resolve({\r\n                    template: component.template.cloneNode(true),\r\n                    url: component.url\r\n                });\r\n            });\r\n        }\r\n\r\n        /**\r\n         * Uses an XMLHttpRequest to load an external file.\r\n         * @param {string} url - the url of the file.\r\n         * @returns {promise} - a promise that is resolved with the file's text content.\r\n        */\r\n       loadResource(component) {\r\n        if (component.template) {\r\n            if(component.isRendered) return this.resolveWithTemplate(component);\r\n            const element = document.createElement('div');\r\n            const template = this.removeCopyrightNotice(component.template);\r\n            element.innerHTML = this.removeNewLines(template);\r\n\r\n            return new Promise((resolve) => {\r\n                resolve({\r\n                    template: element.firstChild.cloneNode(true),\r\n                    url: component.url\r\n                });\r\n            });\r\n        }\r\n\r\n        if (window.__optimize) {\r\n            const id = this.removeSlashes(component.url);\r\n            const element = document.getElementById(id).firstChild;\r\n            // fallback to XHR\r\n            if (!element) return this.requestResource(component.url);\r\n\r\n            return new Promise((resolve) => {\r\n                resolve({template: element.cloneNode(true), url: component.url});\r\n            });\r\n        }\r\n\r\n        return this.requestResource(component.url);\r\n    }\r\n\r\n\r\n        /**\r\n         * Execute an XMLHttpRequest to load a resource by url.\r\n         * @param {string} url - the path to the resource\r\n         * @returns {promise} - promise which resolves with the loaded resource\r\n        */\r\n        requestResource(url) {\r\n            const request = new XMLHttpRequest();\r\n            const promise = new Promise(function (resolve, reject) {\r\n                request.onload = (response) => {\r\n                    if (request.status == 200) {\r\n                        const tempEl = document.createElement('div');\r\n                        tempEl.innerHTML = request.responseText;\r\n                        resolve({template: tempEl.firstChild.cloneNode(true), url: url});\r\n                    } else {\r\n                        reject(response);\r\n                    }\r\n                };\r\n                request.onerror = reject;\r\n            });\r\n            request.open('GET', url);\r\n            request.send();\r\n            return promise;\r\n        }\r\n\r\n        /**\r\n         * Recursively finds the slot elements in a given element.\r\n         * @param {HTMLElement} parent - the element which is searched for slots.\r\n         * @param {object} result - a key:value object containing the slot elements\r\n         * under their data-name as value:\r\n         * { <my-slot-name>: HTMLElement }\r\n         * @returns {Object} result\r\n        */\r\n        findSlots(parent, parentElName, result = {}) {\r\n            const children = parent.children;\r\n            const length = children.length;\r\n\r\n            for (let i = 0; i < length; ++i) {\r\n                const child = children[i];\r\n                const childTagName = child.tagName.toLowerCase();\r\n\r\n                if (child instanceof ComponentSlot) {\r\n                    const name = child.dataset.name;\r\n                    if (!result[name]) result[name] = [];\r\n                    result[name].push(child);\r\n                    this.findSlots(child, parentElName, result);\r\n                } else if (child.hasAttribute('slot')) {\r\n                    const slot = child.getAttribute('slot');\r\n                    if (!result[slot]) result[slot] = [];\r\n                    result[slot].push(child);\r\n                    this.findSlots(child, parentElName, result);\r\n                // the scrollable container is the ONLY component that can hold\r\n                // slots of another elements; we allow this in order achieve\r\n                // better integration of the scrollbar inside other components\r\n                // The WebComponents and the standard slot elements don't support\r\n                // such behavior; an element handles only its own slots. The scrollable\r\n                // container is an exception from this rule.\r\n                } else if (childTagName === 'scrollable-container'\r\n                     || (childTagName !== GF_COMPONENT_SLOT_TAG_NAME\r\n                     && parentElName !== childTagName\r\n                     && !this.definedElements[childTagName])) {\r\n                    // if the child is another nested element don't look for slots in it\r\n                    this.findSlots(child, parentElName, result);\r\n                }\r\n            }\r\n\r\n            return result;\r\n        }\r\n\r\n        replaceSlots(source, target) {\r\n            const fakeRoot = target[0];\r\n            if (source.length && fakeRoot.childNodes.length) {\r\n                while (fakeRoot.firstChild) {\r\n                    fakeRoot.removeChild(fakeRoot.lastChild);\r\n                }\r\n            }\r\n            // remove the slot so that it can be replaced\r\n            const parent = fakeRoot.parentNode;\r\n            parent.removeChild(fakeRoot);\r\n\r\n            for (let i = 0; i < source.length; ++i) {\r\n                parent.appendChild(source[i]);\r\n            }\r\n        }\r\n\r\n        /**\r\n         * Transfers the slottable elements into their slots.\r\n         * @param {HTMLElement} source - the element containing the slottable elements.\r\n         * @param {HTMLElement} target - the element containing the slots elements.\r\n        */\r\n        transferContent(source, target) {\r\n            while (target.childNodes.length > 0) {\r\n                const nodes = target.childNodes;\r\n                target.removeChild(nodes[nodes.length - 1]);\r\n            }\r\n            while (source.childNodes.length > 0) {\r\n                const nodes = source.childNodes;\r\n                const node = nodes[0];\r\n                source.removeChild(node);\r\n                target.appendChild(node);\r\n            }\r\n        }\r\n\r\n        /**\r\n         * Renderes an element only if it wasn't rendered before that\r\n         * @param {HTMLElement} element\r\n         * @returns {boolean} - true if it was rendered, false if not\r\n        */\r\n        renderOnce(element) {\r\n            if (element.isRendered) return false;\r\n\r\n            this.render(element);\r\n            element.isRendered = true;\r\n            return true;\r\n        }\r\n\r\n        /**\r\n        * Renders an element's content into its template.\r\n        * @param {HTMLElement} element - the element into which to render the content\r\n        */\r\n        render(element) {\r\n            const templateRoot = document.createElement('div')\r\n            templateRoot.appendChild(element.template);\r\n\r\n            const parentElName = element.tagName.toLowerCase();\r\n\r\n            const templateSlots = this.findSlots(templateRoot, parentElName);\r\n            const userSlots = this.findSlots(element, parentElName);\r\n\r\n            // use for...of instead of for...in for better performance\r\n            const userSlotsKeys = Object.keys(userSlots);\r\n            const templateSlotsKeys = Object.keys(templateSlots);\r\n\r\n            // there's no point in looping over userSlots if there aren't\r\n            // corresponding template slots\r\n            if (templateSlotsKeys.length) {\r\n                for (let userSlot of userSlotsKeys) {\r\n                    if (!userSlots[userSlot] || !templateSlots[userSlot]) continue;\r\n                    this.replaceSlots(userSlots[userSlot], templateSlots[userSlot]);\r\n                }\r\n            }\r\n\r\n            this.transferContent(templateRoot, element);\r\n        }\r\n    }\r\n\r\n    const components = new GamefaceComponents();\r\n\r\n    class ComponentImport extends HTMLElement {\r\n        constructor() {\r\n            super();\r\n        }\r\n\r\n        connectedCallback() {\r\n            const url = `/components/${this.dataset.url}/`;\r\n            const componentName = `gameface-${this.dataset.url}`;\r\n\r\n            if (components.imported.indexOf(componentName) === -1) {\r\n                components.importComponent(url);\r\n                components.imported.push(componentName);\r\n            }\r\n            this.appendChild(document.createElement(componentName));\r\n        }\r\n    }\r\n\r\n    class ComponentSlot extends HTMLElement {\r\n        constructor() {\r\n            super();\r\n\r\n            this.originalAppendChild = this.appendChild;\r\n            this.originalInsertBefore = this.insertBefore;\r\n            this.originalReplaceChild = this.replaceChild;\r\n            this.originalRemoveChild = this.removeChild;\r\n\r\n            this.appendChild = (node) => {\r\n                const child = this.originalAppendChild(node);\r\n                this.disptachSlotChange(child);\r\n\r\n                return child;\r\n            };\r\n\r\n            this.insertBefore = (newNode, referenceNode) => {\r\n                const child = this.originalInsertBefore(newNode, referenceNode);\r\n                this.disptachSlotChange(child);\r\n\r\n                return child;\r\n            };\r\n\r\n            this.replaceChild = (newChild, oldChild) => {\r\n                const replacedNode = this.originalReplaceChild(newChild, oldChild);\r\n                this.disptachSlotChange(replacedNode);\r\n\r\n                return replacedNode;\r\n            };\r\n\r\n            this.removeChild = (child) => {\r\n                const removedNode = this.originalRemoveChild(child);\r\n                this.disptachSlotChange(removedNode);\r\n\r\n                return removedNode;\r\n            };\r\n        }\r\n\r\n        disptachSlotChange(child) {\r\n            this.dispatchEvent(new CustomEvent('slotchange'), {\r\n                target: this,\r\n                child: child\r\n            });\r\n        }\r\n    }\r\n\r\n    components.defineCustomElement('component-import', ComponentImport);\r\n    components.defineCustomElement(GF_COMPONENT_SLOT_TAG_NAME, ComponentSlot);\r\n\r\n    return components;\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (components());\r\n\n\n//# sourceURL=webpack:///./components/checkbox/node_modules/coherent-gameface-components/components.js?");

/***/ }),

/***/ "./components/checkbox/umd/checkbox.development.js":
/*!*********************************************************!*\
  !*** ./components/checkbox/umd/checkbox.development.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function (global, factory) {\n     true ? factory(exports, __webpack_require__(/*! coherent-gameface-components */ \"./components/checkbox/node_modules/coherent-gameface-components/components.js\")) :\n    undefined;\n}(this, (function (exports, components) { 'use strict';\n\n    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }\n\n    var components__default = /*#__PURE__*/_interopDefaultLegacy(components);\n\n    var template = \"<!--Copyright (c) Coherent Labs AD. All rights reserved. -->\\r\\n<div class=\\\"checkbox-wrapper\\\">\\r\\n    <div class=\\\"checkbox-wrapper-inner\\\">\\r\\n        <component-slot data-name=\\\"checkbox-background\\\">\\r\\n            <div class=\\\"checkbox-background\\\"></div>\\r\\n        </component-slot>\\r\\n        <component-slot data-name=\\\"check-mark\\\">\\r\\n            <div class=\\\"check-mark\\\"></div>\\r\\n        </component-slot>\\r\\n    </div>\\r\\n    <component-slot data-name=\\\"label\\\"><span class=\\\"label\\\">Click me!</span></component-slot>\\r\\n</div>\\r\\n\";\n\n    /*---------------------------------------------------------------------------------------------\r\n     *  Copyright (c) Coherent Labs AD. All rights reserved.\r\n     *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n     *--------------------------------------------------------------------------------------------*/\r\n\r\n    class Checkbox extends HTMLElement {\r\n        constructor() {\r\n            super();\r\n\r\n            this.template = template;\r\n\r\n            this.state = {\r\n                checked: true\r\n            };\r\n\r\n            this.url = '/components/checkbox/template.html';\r\n        }\r\n\r\n        connectedCallback() {\r\n            components__default['default'].loadResource(this)\r\n                .then((result) => {\r\n                    this.template = result.template;\r\n                    components__default['default'].renderOnce(this);\r\n                    this.attachEventListeners();\r\n                })\r\n                .catch(err => console.error(err));\r\n        }\r\n\r\n        /**\r\n         * Toggles the checkbox value. Called on click.\r\n         * Updated the state and the visibility of the check mark.\r\n        */\r\n        toggleChecked() {\r\n            this.state.checked = !this.state.checked;\r\n            this.querySelector('[data-name=\"check-mark\"]').style.display = this.state.checked ? 'block' : 'none';\r\n        }\r\n\r\n        /**\r\n         * Adds event listeners to the checkbox.\r\n         * Attached click handler.\r\n        */\r\n        attachEventListeners() {\r\n            this.addEventListener('click', () => this.toggleChecked());\r\n        }\r\n    }\r\n\r\n    components__default['default'].defineCustomElement('gameface-checkbox', Checkbox);\n\n    exports.Checkbox = Checkbox;\n\n    Object.defineProperty(exports, '__esModule', { value: true });\n\n})));\n\n\n//# sourceURL=webpack:///./components/checkbox/umd/checkbox.development.js?");

/***/ })

/******/ });