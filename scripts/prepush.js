const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function getLatestTag() {
  const result = shell.exec('git describe --tags --abbrev=0', { silent: true });
  if (result.code !== 0) {
    return null;
  }
  return result.stdout.trim();
}

function createAndPushTag(version) {
  const tag = `${version}`;
  if (shell.exec(`git tag ${tag}`).code !== 0) {
    shell.echo('Error: Git tagging failed');
    shell.exit(1);
  }
  if (shell.exec(`git push origin ${tag}`).code !== 0) {
    shell.echo('Error: Git push tag failed');
    shell.exit(1);
  }
}

// Main script execution
const currentVersion = getCurrentVersion();
const latestTag = getLatestTag();
const latestTagVersion = latestTag ? latestTag.replace(/^v/, '') : null;

shell.echo(`current: ${currentVersion} latest: ${latestTagVersion}`);
if (currentVersion !== latestTagVersion) {
  createAndPushTag(currentVersion);
  shell.echo(`Successfully created and pushed tag v${currentVersion}`);
} else {
  shell.echo(`Version has not changed. No tag created.`);
}
