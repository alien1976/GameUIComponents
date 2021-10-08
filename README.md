<!--Copyright (c) Coherent Labs AD. All rights reserved. -->
# Components for Game User Interface [![CI status][github-action-image]][github-action-url] [![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/coherent-gameface-components.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/coherent-gameface-components

[github-action-url]: https://github.com/CoherentLabs/GameUIComponents/actions/workflows/node.js.yml?query=workflow%3A%22Run+Tests%22++
[github-action-image]: https://github.com/CoherentLabs/GameUIComponents/workflows/Run%20Tests/badge.svg


This is a suite of custom elements designed specifically for Gameface. All components can also be used in Google Chrome. You can preview them by starting the demo. You can serve the root directory and open the demo.html file using an http-server of your choice. Or use the default setup in the package.

Navigate to the root directory and run:

    npm install

This will install a webpack server. After that run:

    npm run build

This will build all components used in the demo. After that run:

    npm run start:demo

This will serve the files on http://localhost:8080. Load that url in the Gameface player or in Chrome and preview the components.
You can change the port in the webpack.config.js file.

Custom components examples.

Usage
===================

Start an http-server in the root of the repository. Set the startup page in Gameface to
**http://localhost:8080/examples/<example_name>/"** and launch it.

You can use [http-server](https://www.npmjs.com/package/http-server) or any http-server that you like. Make sure you serve all files. The files in **/lib** and **/components** should be accessible.



Available Commands
===================

These are the commands used to build and package the components.

|Command   |Description   |Arguments   |Usage   |
|---|---|---|---|
|rebuild               |Do a clean install of all dependencies and build everything.                 |N/A|`npm run rebuild`|
|build                 |Build all components - create their demo, umd and cjs bundles.               |[--no-install -ni][--no-install], [--library][--library], [ --documentation][ --documentation]|`npm run build -- --no-install --library --documentation`|
|build:demo            |Build only the demos of all components.                                      |N/A|`npm run build:demo`|
|build:library         |Build only the components library.                                           |N/A|`npm run build:library`|
|build:dev             |Build the components using only the local packages. Will install dependencies only from source, not the npm registry. |N/A|`npm run build:dev`|
|build:documentation   |Build the components, the demos and the documentation.                       |N/A|`npm run build:documentation`|
|start:demo            |Serve the demo project.                                                      |N/A|`npm run start:demo`|
|test                  |Start Karma server on localhost:`<port>`/debug.html                             |N/A|`npm run test`|
|test:Chrome           |Start Karma server and run the tests in Google Chrome.                       |N/A|`npm run test:Chrome`|
|pack                  |Bundle the components to npm packages ready for publish.                     |N/A|`npm run pack`|
|pack:library          |Create npm package of the component library.                                 |N/A|`npm run pack:library`|
|link                  |Create links for all components to test with local packages only[^1].        |N/A|`npm run link`|
|unlink                |Remove all global links that exist for components. To remove the local packages use `npm run clean`.|N/A|`npm run link`|
|install:all           |Recursively install dependencies in all folders located in given root.       |[--rootDir][--rootDir]|`npm run install:all -- --rootDir=components/checkbox`|
|clean                 |Remove all existing bundles, packages and installed dependencies.            |N/A|`npm run clean`|

[^1]: The components will not use the local packages created from source, not the ones from the npm
registry. Useful when you are doing changes the core library or to any of the existing components
and you want to test your changes. Remember to build with the **--no-install** option when using links
as otherwise the build will perform `npm install` which will overwrite the links.

[--no-install]: ## "skip the npm install step"
[--library]: ## "builds only the components library"
[--documentation]: ## "also build the documentation"
[--rootDir]: ## "the folder in which to perform recursive npm install"

After you successfully execute `npm run tests` open the Gameface player or Chrome with "--url=http://localhost:9876/debug.html" to see the tests running.


Creating new Components
===================

All components are npm modules. Your component doesn't have to be an npm module.
If you need to use it in your project only, you can skip the steps which make a
component an npm module. However if at some point you decide that you want to make
your component an npm module - follow the steps below to see how to do it.

## Structure of a Component
All components in the GameUIComponents suite are npm modules.

All Gameface JavaScript components are custom HTML elements. Each component has:
* a JavaScript source file - the custom element's definition; where all the logic is implemented
* a JavaScript index file - the entry file
* an HTML file - the component's template;
* a CSS file - the component's styles
* a package.json file
* a README markdown file - short documentation explaining what the component does and how it's used
* a demo folder - folder containing an example of the component

## Using without bundling

If you don't want to add your component to the GameUIComponent suite you can use it
without building and packaging it as npm module. However, you'll still have to use the
components library as dependency. Initialize an npm project using

`npm init`

and install the components library:

`npm i coherent-gameface-components` for npm version >= 5.0.0
and
`npm i --save coherent-gameface-components` for npm version < 5.0.0

After that create an index.html and index.js files.
Import the components library and the component's definition file using script tag:

```
<script src="node_modules/coherent-gameface-components/umd/components.development.js"></script>
<script src="script.js"></script>
```

Add the custom component to the page:

`<labeled-input></labeled-input>`

The JavaScript definition is a simple class which extends the HTMLElemnt. The
template is loaded using XHR. The url property of the component class shows the
path to the template html file. Use the <link> tags to import style files. Use the `loadResource` method to load
the template. When the template is loaded you can render the component.

```
class LabeledInput extends HTMLElement {
    constructor() {
        super();

        this.url = '/template.html';
    }

    connectedCallback() {
        components.loadResource(this)
            .then((result) => {
                this.template = result.template;
                components.renderOnce(this);
            })
            .catch(err => console.error(err));
    }
}

components.defineCustomElement('labeled-input', LabeledInput);
```

To test the component start an http server at the root and open demo.html. If
you use http-server go to /labeled-input and run:

`http-server`

Navigate to localhost:<port> and check your component.

Adding component to the components suite
=========================================

If you want to contribute to the components library and add a new component you
need to add the required files in the correct folders. Make sure they can be
successfully bundled and add documentation.

All components are placed in the /components folder.
The folders are named using lower case and camel-case for longer names.
All names should be prefixed with `gameface-`. So now instead of labeled-input
the custom element should be named `gameface-labeled-input`:

`components.defineCustomElement('gameface-labeled-input', LabeledInput);`

The build command generates a UMD and a CJS bundles of the component. The module
bundler that is used is Rollup. This means that we can use `import` and `export` statements
and rollup will automatically resolve all modules. Now we can import all dependencies
at the top of the script.js file:

```
import components from 'coherent-gameface-components';
import template from './template.html';
```

And we can export the labeled input at the bottom:

`export { LabeledInput };`

Because the templates are imported as modules we no longer need to
load them using XHR.
Set the template as a property of the component:

`this.template = template;`

The loadResource method can both work with URL and an imported template. The usage
is the same so that it is more convenient to switch between XHR and imported template.
This is how the component's definition looks like after the changes:

```
import components from 'coherent-gameface-components';
import template from './template.html';

class LabeledInput extends HTMLElement {
    constructor() {
        super();

        this.template = template;
    }

    connectedCallback() {
        components.loadResource(this)
            .then((result) => {
                this.template = result.template;
                components.renderOnce(this);
            })
            .catch(err => console.error(err));
    }
}

components.defineCustomElement('gameface-labeled-input', LabeledInput);

export { LabeledInput };
```

**Important for components compatible with Gameface**:

When using [data-binding](https://coherent-labs.com/Documentation/cpp-gameface/d1/ddb/data_binding.html)
you must call `engine.synchronizeModels();` within the `connectedCallback` for the component like so:

```js
connectedCallback() {
    components.loadResource(this)
        .then((result) => {
            this.template = result.template;
            components.renderOnce(this);
			
			engine.synchronizeModels();
        })
        .catch(err => console.error(err));
}
```

For example if the **template** of the component is:

```html
<div class="input-label" data-bind-value="{{Inputs.exampleInput.label}}">Input Label Placeholder</div>
<div class="input"></div>
```

Not including `engine.synchronizeModels();` will result in not updating the
`.input-label` Element value and the value will always remain
"Input Label Placeholder" as it is in the template.


Because all components are npm packages you need to add an entry index.js file.
This is the file that would be loaded when you import your component from node_modules
like this:

`import { LabeledInput } from 'gameface-labeled-input'`

It should export either the development or the production CJS bundle:

```
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/labeled-input.production.min.js');
} else {
    module.exports = require('./cjs/labeled-input.development.js');
}
```

Each component has a demo page. It is placed in a /demo folder.
The JavaScript file of the demo should be bundled so that it can be easily checked with double click
or drag and drop without the need to manually setup an environment.

The demo.js file imports all dependencies so that Rollup can resolve and bundle them.

```
import components from 'coherent-gameface-components';
import LabeledInput from './umd/labeled-input.development.js'
```

The demo.html file should import the bundle.js and use the custom element:

```
<body>
    <gameface-labeled-input></gameface-labeled-input>
    <script src="./bundle.js"></script>
</body>
```

Note that the demo files should have the names demo.js and demo.html for the
JavaScript and html files respectively.

We have the definition, the demo, the entry file. All that is left in order to
build the component is to specify which files will be added to the npm package.
This is done in the package.json file using the files field:

```
  "files": [
    "LICENSE",
    "README.md",
    "demo.html",
    "index.js",
    "script.js",
    "cjs/",
    "umd/"
  ],
```
*Skip the files property if you want to include all files.*

Use the LICENSE template.

Now navigate to the components root folder and run:

`npm run rebuild`

The newly created bundles are located in labeled-input/umd and labeled-input/cjs
folders. To test if everything works open the demo.html file.

If everything works, add a README.md file to the component folder and add
a documentation page to the docs/ folder.

# Testing

All tests are located in tools/tests. For more information on how to create and run a test refer to the [documentation](https://github.com/CoherentLabs/GameUIComponents/blob/master/tools/tests/README.md).
