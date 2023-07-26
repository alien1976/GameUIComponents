/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const execSync = require('child_process').execSync;
const path = require('path');
const { folderContainsFiles } = require('./test-helpers/utils');
const rimraf = require('rimraf');

const componentFolder = 'create-component-test-folder';
const componentName = 'test-name';
const componentFolderPath = path.resolve(path.join(process.cwd(), componentFolder));
const componentSourcePath = path.join(componentFolderPath, componentName);

describe('build component test', () => {
    afterAll(() => {
        rimraf.sync(componentFolderPath);
    });

    test('Builds a component CJS and UMD modules from source', () => {
        // create a component
        execSync(`node index.js create ${componentName} ./${componentFolder}`, { encoding: 'utf8' });

        // install the component's dependencies
        execSync(`npm link coherent-gameface-components && npm i`, { cwd: componentSourcePath, stdio: 'inherit', encoding: 'utf8' });
        // build the component's umd and cjs bundles
        execSync(`node ../../index.js build`, { cwd: componentSourcePath, stdio: 'inherit', encoding: 'utf8' });
        // check inf the bundle folders were created
        const hasBundles = folderContainsFiles(componentSourcePath, ['umd', 'cjs']);
        expect(hasBundles).toBe(true);
    });

    test('Has UMD files', () => {
        // check if the UMD JavaScript bundles were created
        const hasUMDBundles = folderContainsFiles(
            path.join(componentSourcePath, 'umd'),
            [`${componentName}.development.js`, `${componentName}.production.min.js`]);

        expect(hasUMDBundles).toBe(true);
    });

    test('Has CJS files', () => {
        // check if the CJS JavaScript bundles were created
        const hasUMDBundles = folderContainsFiles(
            path.join(componentSourcePath, 'cjs'),
            [`${componentName}.development.js`, `${componentName}.production.min.js`]);

        expect(hasUMDBundles).toBe(true);
    });
});
