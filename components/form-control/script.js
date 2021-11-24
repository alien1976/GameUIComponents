/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import components from 'coherent-gameface-components';
import { CustomElementValidator, NativeElementValidator} from 'coherent-gameface-components';
import 'url-search-params-polyfill';

const formMethods = {
    GET: 'GET',
    POST: 'POST'
};

const tags = {
    BUTTON: 'button',
    INPUT: 'input',
    TEXTAREA: 'textarea',
    GAMEFACE_CHECKBOX: 'gameface-checkbox',
    GAMEFACE_DROPDOWN: 'gameface-dropdown',
    GAMEFACE_RADIO_GROUP: 'gameface-radio-group',
    GAMEFACE_RANGESLIDER: 'gameface-rangeslider',
    GAMEFACE_SWITCH: 'gameface-switch'
}

const VALID_SUBMIT_ELEMENT_TAGS = new Set([tags.BUTTON, tags.INPUT]);
const VALID_FORM_CONTROL_ELEMENT_TAGS = new Set([tags.BUTTON, tags.INPUT, tags.TEXTAREA]);
const VALID_FORM_CONTROL_CUSTOM_ELEMENT_TAGS = new Set([
    tags.GAMEFACE_CHECKBOX,
    tags.GAMEFACE_DROPDOWN,
    tags.GAMEFACE_RADIO_GROUP,
    tags.GAMEFACE_RANGESLIDER,
    tags.GAMEFACE_SWITCH
]);

class GamefaceFormControl extends HTMLElement {
    constructor() {
        super();
        this.currentSubmitButton = null;
    }

    get method() {
        return this.getAttribute('method') || formMethods.GET;
    }

    get action() {
        return this.getAttribute('action') || '';
    }

    /**
     * Will serialize the form data by traversing all the form element tree
     * @returns {string}
     */
    getFormSerializedData() {
        const params = new URLSearchParams();

        //Serialize the data if there is any set on the submit button
        this.serializeSubmitButtonElementData(params);
        this.traverseFormElements(this, (element) => {
            //We dont need data from invalid elements and elements that are having type "submit"
            if (!this.isValidFromElement(element) || this.isElementUsedToSubmit(element)) return;

            this.serializeElementData(element, params);
        })

        return params.toString();
    }

    /**
     * Will serialize the data from the submit button if it has value attribute and it is <button> or <input type="submit"/>.
     * @param {URLSearchParams} params
     */
    serializeSubmitButtonElementData(params) {
        if (!this.currentSubmitButton) return;

        const tagName = this.currentSubmitButton.tagName.toLowerCase();
        if (VALID_SUBMIT_ELEMENT_TAGS.has(tagName)) return;

        if (this.currentSubmitButton.hasAttribute('name') && this.currentSubmitButton.hasAttribute('value')) {
            params.append(this.currentSubmitButton.getAttribute('name'), this.currentSubmitButton.getAttribute('value'));
        }
    }

    /**
     * Will serialize data from a simple form element like input or textarea
     * @param {HTMLElement} element
     * @param {URLSearchParams} params
     */
    serializeSimpleElementData(element, params) {
        const value = element.value;

        if (!element.hasAttribute('name') || value === undefined) return;

        const name = element.getAttribute('name');

        if (!(value instanceof Array)) return params.append(name, element.value);
        for (let option of element.value) {
            params.append(name, option);
        }
    }

    hasErrors(element) {
        const errorNames = {
            notAForm: !element.isFormElement(),
            tooLong: element.tooLong(),
            tooShort: element.tooShort(),
            valueMissing: element.valueMissing(),
            nameMissing: element.nameMissing(),
            customError: element.customError()
        };

        const errors = Object.keys(errorNames).filter((name) => {
            if(errorNames[name]) return name;
        });

        return { hasError: errors.length, errors: errors };
    }

    validateElement(element) {
        if (!(element instanceof CustomElementValidator)) element = new NativeElementValidator(element);
        return this.hasErrors(element);
    }

    /**
     * Will serialize the data from form element
     * @param {HTMLElement} element
     * @param {URLSearchParams} params
     */
    serializeElementData(element, params) {
        if (element.hasAttribute('disabled')) return;
        const tagName = element.tagName.toLowerCase();

        const validation = this.validateElement(element);

        if (!validation.hasError) {
            return this.serializeSimpleElementData(element, params);
        } else {
            console.error(`The following errors ocurred: ${validation.errors.join(',')}, element: ${element.getAttribute('name')}`);
        }

        // else prevent submit?

        // switch (tagName) {
        //     case tags.INPUT:
        //     case tags.TEXTAREA:
        //         return this.serializeSimpleElementData(element, params);
        //     case tags.GAMEFACE_SWITCH:
        //         return this.serializeSwitchData(element, params);
        //     case tags.GAMEFACE_RANGESLIDER:
        //         return this.serializeRangeSliderData(element, params);
        //     case tags.GAMEFACE_CHECKBOX:
        //         return this.serializeCheckboxData(element, params);
        //     case tags.GAMEFACE_DROPDOWN:
        //         return this.serializeDropDownData(element, params);
        //     case tags.GAMEFACE_RADIO_GROUP:
        //         return this.serializeRadioGroupData(element, params);
        //     default: break;
        // }
    }

    /**
     * Checks whether the element is valid gameface-form-control element
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    isValidFromElement(element) {
        const tagName = element.tagName.toLowerCase();

        return VALID_FORM_CONTROL_ELEMENT_TAGS.has(tagName) || VALID_FORM_CONTROL_CUSTOM_ELEMENT_TAGS.has(tagName);
    }

    /**
     * Checks whether the element is submit button
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    isElementUsedToSubmit(element) {
        return element.getAttribute('type') === 'submit';
    }

    /**
     * Will dispatch a custom event from the gameface-form-control element about request loadend holding the response event.
     * We need custom event here in order to send response event to the user.
     * @param {ProgressEvent} event - The event from the XMLHttpRequest
     */
    onRequestLoadEnd(event) {
        const loadEndEvent = new CustomEvent('loadend', { detail: event });
        this.dispatchEvent(loadEndEvent);
        if (this.onload) this.onload(loadEndEvent);
    }

    /**
     * Will create a XMLHttpRequest to the server
     * @param {string} type - The request type. Either 'GET' or 'POST'
     * @param {string} body - The body of the request that will be send
     * @param {string} action - The url where that will be requested
     */
    makeRequest(type, body, action) {
        const xhr = new XMLHttpRequest();
        xhr.open(type, action);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onloadend = this.onRequestLoadEnd.bind(this);
        if (body) {
            xhr.send(body);
        } else {
            xhr.send();
        }
    }

    /**
     * Will handle submit of the form control
     * @param {MouseEvent} event
     */
    submit(event) {
        //Dispatch submit event to the form as it is by standard
        const submitEvent = new Event('submit', { cancelable: true });
        if (!this.dispatchEvent(submitEvent)) return;
        if (this.onsubmit && typeof this.onsubmit === 'function') {
            this.onsubmit(submitEvent);
            if (submitEvent.defaultPrevented) return;
        }

        this.currentSubmitButton = event.currentTarget;
        switch (this.method.toLowerCase()) {
            case formMethods.GET.toLowerCase():
                this.makeRequest(formMethods.GET, null, `${this.action}?${this.getFormSerializedData()}`)
                break;
            case formMethods.POST.toLowerCase():
                this.makeRequest(formMethods.POST, this.getFormSerializedData(), this.action)
                break;
            default:
                console.warn('Unable to submit form. The form method is not "GET" or "POST"!');
                break;
        }
    }

    /**
     * Will traverse the gameface-form-control element tree and execute a callback when element is found.
     * This method is used to prevent performance issues when used querySelector multiple times.
     * @param {HTMLElement} root
     * @param {Function} elementCallback - Callback that will be executed for each child element of the root
     */
    traverseFormElements(root, elementCallback) {
        if (!root.children) return;

        //Consider iterating the tree with queue if there are stack issues with the recursion
        for (let i = 0, len = root.children.length; i < len; i++) {
            const element = root.children[i];

            elementCallback(element);

            this.traverseFormElements(element, elementCallback);
        }
    }

    /**
     * Callback that will add click event to the gameface-form-control elements that are having submit type attribute
     * @param {HTMLElement} element
     */
    addSubmitElementListener(element) {
        if (VALID_SUBMIT_ELEMENT_TAGS.has(element.tagName.toLowerCase()) && element.getAttribute('type') === 'submit') {
            element.addEventListener('click', this.submit.bind(this));
        }
    }

    /**
     * Will add click events to all the submit elements inside the form control
     */
    initSubmitElements() {
        this.traverseFormElements(this, (formElement) => {
            this.addSubmitElementListener(formElement);
        });
    }

    connectedCallback() {
        this.initSubmitElements();
    }
}

components.defineCustomElement('gameface-form-control', GamefaceFormControl);
export default GamefaceFormControl;