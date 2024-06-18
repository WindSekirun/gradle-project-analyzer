import { Injectable } from '@nestjs/common';
import { CommandService } from '../command/command.service';
import { PrismaService } from '../prisma/prisma.service';
import { getRepoPath } from '../utils/path';

@Injectable()
export class GitService {
  constructor(
    private commandService: CommandService,
    private prismaService: PrismaService,
  ) {}

  async delete(repoName: string) {
    await this.commandService.runCommand(`rm -rf ${getRepoPath(repoName)}`);
  }

  async deleteBranch(repoName: string, branchName: string) {
    await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} branch -D ${branchName}`);
  }

  async tag(repoName: string, tagName: string) {
    await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} tag ${tagName}`);
  }

  async deleteTag(repoName: string, tagName: string) {
    await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} tag -d ${tagName}`);
  }

  async pull(repoName: string) {
    return await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} pull`);
  }

  async fetch(repoName: string) {
    return await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} fetch`);
  }

  async status(repoName: string) {
    return await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} status`);
  }

  async checkout(repoName: string, newBranch: string, ref?: string) {
    const command = ref
      ? `git -C ${getRepoPath(repoName)} checkout -b ${newBranch} ${ref}`
      : `git -C ${getRepoPath(repoName)} checkout ${newBranch}`;
    return await this.commandService.runCommand(command);
  }

  async updateProject(repoName: string) {
    await this.fetch(repoName);
    return await this.pull(repoName);
  }

  async clone(repoName: string, repoUrl: string): Promise<string> {
    const localPath = getRepoPath(repoName);
    await this.commandService.runCommand(`git clone ${repoUrl} ${localPath}`);
    const currentBranch = await this.getCurrentBranch(repoName);

    await this.prismaService.project.upsert({
      where: {
        repoName: repoName,
      },
      update: {
        origin: repoUrl,
        defaultBranch: currentBranch,
      },
      create: {
        repoName: repoName,
        origin: repoUrl,
        defaultBranch: currentBranch,
      },
    });

    return Promise.resolve(`Initiaized '${repoName}' with ${currentBranch} branch`);
  }

  async getCurrentBranch(repoName: string) {
    return await this.commandService.runCommand(`git -C ${getRepoPath(repoName)} rev-parse --abbrev-ref HEAD`);
  }

  async log(repoName: string, relativePath: string, size: number): Promise<any[]> {
    const command = `git -C ${getRepoPath(repoName)} log -n ${size} --pretty=format:'%H|%an|%ae|%s' -- ${relativePath}`;

    try {
      const stdout = await this.commandService.runCommand(command);
      return stdout.split('\n').map((log) => {
        const [hash, authorName, authorEmail, message] = log.split('|');
        return { hash, authorName, authorEmail, message };
      });
    } catch (error) {
      throw new Error(`Error executing git command: ${error.message}`);
    }
  }
}
