const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const LAST_VERSION_FILE = path.join(__dirname, '../last_version.txt');
const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function getLastVersion() {
  if (!fs.existsSync(LAST_VERSION_FILE)) {
    return '0.0.0';
  }
  return fs.readFileSync(LAST_VERSION_FILE, 'utf8').trim();
}

function updateLastVersion(version) {
  fs.writeFileSync(LAST_VERSION_FILE, version, 'utf8');
}

function createAndPushTag(version) {
  if (shell.exec(`git tag ${version}`).code !== 0) {
    shell.echo('Error: Git tagging failed');
    shell.exit(1);
  }
  if (shell.exec(`git push origin ${version}`).code !== 0) {
    shell.echo('Error: Git push tag failed');
    shell.exit(1);
  }
}

const currentVersion = getCurrentVersion();
const lastVersion = getLastVersion();

if (currentVersion !== lastVersion) {
  createAndPushTag(currentVersion);
  updateLastVersion(currentVersion);
  shell.echo(`Successfully created and pushed tag ${currentVersion}`);
} else {
  shell.echo(`Version has not changed. No tag created.`);
}
