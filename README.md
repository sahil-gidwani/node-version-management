# Version Management Script Documentation

---

### Overview

This script facilitates version management for software projects, allowing users to initialize, increment, set, update, and delete versions stored in a JSON file named `versions.json`. Below is a comprehensive guide detailing its usage, supported command-line options, and integration as an npm script.

### Structure of `versions.json`

The `versions.json` file contains an array of version objects with the following structure:

```json
{
  "versions": [
    {
      "version": "1.0.0",
      "latestCommitId": "a4e6b14f9c97a0c0c4d9e2c6c8fb3d637c9dc0f8",
      "createdDatetime": "2024-01-30T08:33:04.275Z"
    },
    {
      "version": "1.0.1",
      "latestCommitId": "3e2456d2b7a88d0963c35a1a80cddae6e12f79d1",
      "createdDatetime": "2024-01-30T08:33:16.683Z"
    },
    ...
  ]
}
```

## Dependencies
- fs: Node.js file system module for file operations.
- child_process: Node.js module for executing shell commands.
- minimist: Node.js module for parsing command-line arguments.

---

## Functions

### initializeVersion()
- Initializes version data if versions.json does not exist.
- Accepts an optional initial version number.

### getVersionData()
- Retrieves version data from the versions.json file.

### incrementVersion(versionData)
- Increments the latest version number and updates versions.json.

### incrementVersionNumber(version)
- Increments the version number.

### setVersion(version)
- Sets a specific version if it's greater than the latest version.

### compareVersions(version1, version2)
- Compares two version numbers.

### updateSpecificVersion(version)
- Updates a specific version with the latest commit ID and timestamp.

### updateLatestVersion(versionData)
- Updates the latest version with the latest commit ID and timestamp.

### deleteSpecificVersion(version)
- Deletes a specific version from the version data.

### deleteLatestVersion(versionData)
- Deletes the latest version from the version data.

### Main Function (main())
- Executes based on command-line arguments:
  - Initializes version data if versions.json does not exist.
  - Updates, deletes, sets, or increments versions based on provided options.

---

### Usage

To execute the script, use the following command:

```
node <script_name.js> [options]
```

### Command-line Options

- `--version`: Specifies the version number.
- `--update`: Updates the specified version.
- `--delete`: Deletes the specified version.

If no options are provided, the script increments the latest version.

### Examples

#### 1. Initialize Version

Initialize the version data with an initial version:

```
node versioning.js --version=0.0.0
```

If a version is not provided the initial version is set to 1.0.0

#### 2. Increment Version

Increment the latest version:

```
node versioning.js
```

The default behaviour is to increment the latest version by 0.0.1

#### 3. Set Version

Set a specific version (must be greater than the latest version):

```
node versioning.js --version=2.0.0
```

#### 4. Update Version

Update a specific version with the latest commit ID and timestamp:

```
node versioning.js --version=1.0.1 --update
```

If a version is not provided then it updates the latest version

#### 5. Delete Version

Delete a specific version:

```
node versioning.js --version=1.0.0 --delete
```

If a version is not provided then it deletes the latest version

### Integration as npm Script

Add the following line to your `package.json`:

```json
"scripts": {
    "version-management": "node versioning.js"
}
```

Then execute the script using:

```
npm run version-management -- [options]
```

---
