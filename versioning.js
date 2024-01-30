const fs = require('fs');
const { execSync } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

// Get the current datetime
const currentDatetime = new Date().toISOString();
// Get the latest commit ID
const latestCommitId = execSync('git rev-parse HEAD').toString().trim();
// const latestCommitId = '10000000';

function main() {
    if (!fs.existsSync('versions.json')) {
        initializeVersion();
    } else {
        const versionData = getVersionData();

        if (argv.version && argv.update) {
            updateSpecificVersion(argv.version);
        } else if (argv.version && argv.delete) {
            deleteSpecificVersion(argv.version);
        } else if (argv.update) {
            updateLatestVersion(versionData);
        } else if (argv.delete) {
            deleteLatestVersion(versionData);
        } else if (argv.version) {
            setVersion(argv.version);
        } else {
            incrementVersion(versionData);
        }
    }
}

// Function to initialize the version data
function initializeVersion() {
    const initialVersion = argv.version || '1.0.0';
    const initialVersionData = { versions: [{ version: initialVersion, latestCommitId: latestCommitId, createdDatetime: currentDatetime }] };
    
    fs.writeFileSync('versions.json', JSON.stringify(initialVersionData, null, 2));
    console.log(`Version initialized to ${initialVersion} with commit ID ${latestCommitId} at ${currentDatetime}`);
}

// Function to get version data from versions.json
function getVersionData() {
    return JSON.parse(fs.readFileSync('versions.json'));
}

// Function to increment the latest version
function incrementVersion(versionData) {
    const latestVersion = versionData.versions[versionData.versions.length - 1].version;
    const newVersion = incrementVersionNumber(latestVersion);

    versionData.versions.push({ version: newVersion, latestCommitId: latestCommitId, createdDatetime: currentDatetime });
    fs.writeFileSync('versions.json', JSON.stringify(versionData, null, 2));
    console.log(`Version incremented to ${newVersion} with commit ID ${latestCommitId} at ${currentDatetime}`);
}

// Function to increment the version number
function incrementVersionNumber(version) {
    const [major, minor, patch] = version.split('.').map(Number);
    const newPatch = patch + 1;
    return `${major}.${minor}.${newPatch}`;
}

// Function to set a specific version
function setVersion(version) {
    const versionData = getVersionData();
    const latestVersion = versionData.versions[versionData.versions.length - 1].version;

    // Compare the provided version with the latest version
    if (compareVersions(version, latestVersion) > 0) {
        versionData.versions.push({ version, latestCommitId: latestCommitId, createdDatetime: currentDatetime });
        fs.writeFileSync('versions.json', JSON.stringify(versionData, null, 2));
        console.log(`Version set to ${version} with commit ID ${latestCommitId} at ${currentDatetime}`);
    } else {
        console.log(`Error: Provided version ${version} is not greater than the latest version ${latestVersion}`);
    }
}

// Function to compare two versions
function compareVersions(version1, version2) {
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);

    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const num1 = v1[i] || 0;
        const num2 = v2[i] || 0;
        if (num1 !== num2) {
            return num1 - num2;
        }
    }

    return 0;
}

// Function to update a specific version
function updateSpecificVersion(version) {
    const versionData = getVersionData();
    const index = versionData.versions.findIndex(item => item.version === version);
    if (index !== -1) {
        versionData.versions[index].latestCommitId = latestCommitId;
        versionData.versions[index].createdDatetime = currentDatetime;
        fs.writeFileSync('versions.json', JSON.stringify(versionData, null, 2));
        console.log(`Version ${version} updated with commit ID ${latestCommitId} at ${currentDatetime}`);
    } else {
        console.log(`Version ${version} not found.`);
    }
}

// Function to update the latest version
function updateLatestVersion(versionData) {
    const latestVersion = versionData.versions[versionData.versions.length - 1].version;
    versionData.versions[versionData.versions.length - 1].latestCommitId = latestCommitId;
    versionData.versions[versionData.versions.length - 1].createdDatetime = currentDatetime;
    fs.writeFileSync('versions.json', JSON.stringify(versionData, null, 2));
    console.log(`Latest version (${latestVersion}) updated with commit ID ${latestCommitId} at ${currentDatetime}`);
}

// Function to delete a specific version
function deleteSpecificVersion(version) {
    const versionData = getVersionData();
    const index = versionData.versions.findIndex(item => item.version === version);
    if (index !== -1) {
        versionData.versions.splice(index, 1);
        fs.writeFileSync('versions.json', JSON.stringify(versionData, null, 2));
        console.log(`Version ${version} deleted.`);
    } else {
        console.log(`Version ${version} not found.`);
    }
}

// Function to delete the latest version
function deleteLatestVersion(versionData) {
    const latestVersion = versionData.versions.pop();
    fs.writeFileSync('versions.json', JSON.stringify(versionData, null, 2));
    console.log(`Latest version (${latestVersion.version}) deleted.`);
}

main();
