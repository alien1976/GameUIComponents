import components from 'coherent-gameface-components';
import RadialMenu from '../umd/radial-menu.development';
import {pm} from 'postmessage-polyfill';
import {fetch as fetchPolyfill} from 'whatwg-fetch';

window.postMessage = function(message) {
    pm({
        origin: 'http://127.0.0.1/:3000',
        target: window,
        data: message
    });
};
