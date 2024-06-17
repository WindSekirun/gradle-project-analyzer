import { join } from 'path';

export function getRepoPath(repoName: string) {
  return join(__dirname, '..', '..', 'data/', 'repos', repoName);
}
