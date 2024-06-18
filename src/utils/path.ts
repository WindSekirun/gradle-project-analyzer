import { join } from 'path';

export function getRepoPath(repoName: string) {
  return join(__dirname, '..', '..', 'data/', 'repos', repoName);
}

export function getScriptsPath(scriptFile: string) {
  return join(__dirname, '..', '..', 'scripts/', scriptFile);
}
