/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

async function setupRadialMenuTestPage() {
	const template = `
	<gameface-radial-menu id="radial-menu-one"
		data-name="Radial Menu Name Test"
		data-change-event-name="radOneItemChanged"
		data-select-event-name="radOneItemSelected"
		data-open-key-code="16"
		class="radial-menu-component"></gameface-radial-menu>
	`;

	const el = document.createElement('div');
	el.className = 'radial-menu-test-wrapper';

	el.innerHTML = template;

	const currentEl = document.querySelector('.radial-menu-test-wrapper');

	// Since we don't want to replace the whole content of the body using
	// innerHtml setter, we query only the current custom element and we replace
	// it with a new one; this is needed because the specs are executed in a random
	// order and sometimes the component might be left in a state that is not
	// ready for testing
	if (currentEl) {
		currentEl.parentElement.removeChild(currentEl);
	}

	document.body.appendChild(el);

	await createAsyncSpec(() => {
		const radialMenuOne = document.getElementById('radial-menu-one');
		// Provide the items.
		radialMenuOne.items = itemsModel.items;
	});

	// the .items setter triggers a DOM change, so we wait a bit to make
	// sure the DOM is ready.
	await createAsyncSpec();
}

function dispatchKeyboardEventKeyDown(keyCode, element) {
	element.dispatchEvent(new KeyboardEvent('keydown', { keyCode: keyCode }));
}

function dispatchKeyboardEventKeyUp(keyCode, element) {
	element.dispatchEvent(new KeyboardEvent('keyup', { keyCode: keyCode }));
}

describe('Radial Menu Tests', () => {
	afterAll(() => cleanTestPage('.radial-menu-test-wrapper'));

	describe('Radial Menu', () => {
		beforeEach(function (done) {
			setupRadialMenuTestPage().then(done).catch(err => console.error(err));
		});

		it('Should be created', () => {
			assert(document.querySelector('gameface-radial-menu').id === 'radial-menu-one', 'The id of the radial menu is not radial-menu-one.');
		});

		it('Should set the provided name', () => {
			assert(document.querySelector('.radial-menu-center-text').textContent === 'Radial Menu Name Test', 'The textContent of the radial menu is not "Radial Menu Name Test".');
		});

		it('Should have items and their count to be 8', () => {
			assert(document.querySelectorAll('.radial-menu-item').length === 8, 'The length of .radial-menu-item elements is not 8.');
		});

		it('Should have background image url on a populated element', () => {
			const backgroundImageUrl = document.querySelectorAll('.radial-menu-item-icon')[2].style.backgroundImage;

			assert(backgroundImageUrl.includes('weapon3') === true, `The background image url is not "url("./images/weapon3.png")".`);
		});

		it('Should have transform rotate on a populated element', () => {
			// remove all numbers after the decimal point (if any)
			let transformValue = document.querySelectorAll('.radial-menu-item-icon')[7].style.transform.replace(/\.\d+/, '');
			assert((transformValue === 'rotate(-315deg)' || transformValue === 'rotateZ(-315deg)'),
				'The transform property of the radial-menu-item-icon is not "rotate(-315deg)" nor "rotateZ(-315deg)".');
		});

		it('Should have opened on keydown', async () => {
			const radialMenu = document.querySelector('gameface-radial-menu');

			dispatchKeyboardEventKeyDown(16, window);

			// The menu is opened 2 frames after the opening function is called.
			return createAsyncSpec(() => {
				assert(radialMenu.classList.contains('radial-menu-open') === true, 'Radial menu did not open.');
			});
		});

		it('Should have closed on keyup after opening', async () => {
			const radialMenu = document.querySelector('gameface-radial-menu');

			dispatchKeyboardEventKeyDown(16, window);

			await createAsyncSpec(() => {
				assert(radialMenu.classList.contains('radial-menu-open') === true, 'Radial menu did not open prior to finishing the test.');
			});

			await createAsyncSpec(() => {
				dispatchKeyboardEventKeyUp(16, window);
			});

			return createAsyncSpec(() => {
				assert(radialMenu.classList.contains('radial-menu-open') === false, 'Radial menu has not closed.');
			});
		});

		it('Should successfully attach to and use custom event', async () => {
			const radialMenu = document.querySelector('gameface-radial-menu');

			let selectedState = false;

			await createAsyncSpec(() => {
				radialMenu.addEventListener('radOneItemSelected', () => {
					selectedState = true;
				});
			});

			await createAsyncSpec(() => {
				dispatchKeyboardEventKeyDown(16, window);
			});

			await createAsyncSpec(() => {
				dispatchKeyboardEventKeyUp(16, window);
			});

			return createAsyncSpec(() => {
				assert(selectedState === true, 'selectedState is not true.');
			});
		});
	});
});
