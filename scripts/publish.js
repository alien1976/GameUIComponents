const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { getPackageJSON } = require('./helpers');
const { getPublicVersion } = require('./utils');
const COMPONENTS_PATH = path.join(__dirname, '../components');
const LIBRARY_PATH = path.join(__dirname, '../');
const CLI_PATH = path.join(__dirname, '../tools');
// eslint-disable-next-line no-undef
const { Octokit } = require('octokit');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// /**
//  * Checks if some component should be updated in npm if its version is bumped
//  * @param {string} component
//  * @param {string} folder
//  * @returns {boolean}
//  */
// function getPackagePrevAndCurrentVersions(component, folder = COMPONENTS_PATH) {
//     const packageJSON = getPackageJSON(component, folder);
//     if (!packageJSON) return [null, null];

//     const name = packageJSON.name;
//     const localVersion = packageJSON.version;

//     // if a component doesn't exist in the registry then it must be published
//     if (!JSON.parse(execSync(`npm search ${name} --json`, { encoding: 'utf8' })).length) return [localVersion, null];

//     const publicVersion = getPublicVersion(name);

//     return [localVersion, publicVersion];
// }

/**
 * Checks if some component should be updated in npm if its version is bumped
 * @param {string} component
 * @param {string} folder
 * @returns {boolean}
 */
function shouldUpdate(component, folder = COMPONENTS_PATH) {
    const packageJSON = getPackageJSON(component, folder);
    if (!packageJSON) return false;

    const name = packageJSON.name;

    // if a component doesn't exist in the registry then it must be published
    if (!JSON.parse(execSync(`npm search ${name} --json`, { encoding: 'utf8', stdio: 'inherit' })).length) return true;

    const localVersion = packageJSON.version;
    const publicVersion = getPublicVersion(name);

    if (localVersion !== publicVersion) {
        console.log(`Package ${component} has new version - ${localVersion}, current is ${publicVersion}.`);
        return true;
    }

    return false;
}

// // eslint-disable-next-line require-jsdoc
// async function getReleaseNotes(component, folder = COMPONENTS_PATH) {
//     const [localVersion, publicVersion] = getPackagePrevAndCurrentVersions(component, folder);

//     return await octokit.request('POST /repos/alien1976/GameUIComponents/releases/generate-notes', {
//         owner: 'alien1976',
//         repo: 'GameUIComponents',
//         tag_name: localVersion,
//         target_commitish: 'master',
//         previous_tag_name: publicVersion || '',
//         configuration_file_path: '.github/release.yml',
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28',
//         },
//     });
// }

// eslint-disable-next-line require-jsdoc
async function createRelease(tag) {
    await octokit.request('POST /repos/alien1976/GameUIComponents/releases', {
        owner: 'alien1976',
        repo: 'GameUIComponents',
        tag_name: tag,
        target_commitish: 'master',
        name: tag,
        draft: false,
        prerelease: false,
        generate_release_notes: true,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
}

/**
 * Will publish component changes in npm
 * @param {string} component
 * @param {string} folder
 */
async function publish(component, folder = COMPONENTS_PATH) {
    try {
        const { version, name } = JSON.parse(fs.readFileSync(path.join(folder, 'package.json')));
        execSync(`git tag ${name}@${version}`, { cwd: path.join(folder, component), encoding: 'utf8', stdio: 'inherit' });
        execSync(`git push origin ${name}@${version}`, { cwd: path.join(folder, component), encoding: 'utf8', stdio: 'inherit' });
        createRelease(version);
        // execSync(`npm publish`, { cwd: path.join(folder, component), encoding: 'utf8' });
        console.log(`Successfully published ${component}.`);
    } catch (err) {
        console.error(err);
    }
}

/** */
async function main() {
    if (shouldUpdate('lib', LIBRARY_PATH)) await publish('lib', LIBRARY_PATH);
    if (shouldUpdate('cli', CLI_PATH)) await publish('cli', CLI_PATH);
    if (shouldUpdate('interaction-manager', LIBRARY_PATH)) await publish('interaction-manager', LIBRARY_PATH);

    const components = fs.readdirSync(COMPONENTS_PATH);
    for (const component of components) {
        if (shouldUpdate(component)) await publish(component);
    }
}

main();
