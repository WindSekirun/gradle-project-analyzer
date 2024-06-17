import { Injectable } from '@nestjs/common';
import { join } from 'path';
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
    await this.commandService.runCommand('delete', `rm -rf ${getRepoPath(repoName)}`);
    return await this.prismaService.project.delete({
      where: {
        repoName,
      },
    });
  }

  async pull(repoName: string) {
    return await this.commandService.runCommand('delete', `git -C ${getRepoPath(repoName)} pull`);
  }

  async fetch(repoName: string) {
    return await this.commandService.runCommand('delete', `git -C ${getRepoPath(repoName)} fetch`);
  }

  async status(repoName: string) {
    return await this.commandService.runCommand('delete', `git -C ${getRepoPath(repoName)} status`);
  }

  async checkout(repoName: string, newBranch: string, ref: string) {
    return await this.commandService.runCommand('delete', `git -C ${getRepoPath(repoName)} checkout -b ${newBranch} ${ref}`);
  }

  async clone(repoName: string, repoUrl: string): Promise<string> {
    const localPath = getRepoPath(repoName);
    await this.commandService.runCommand('clone', `git clone ${repoUrl} ${localPath}`);
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
    return await this.commandService.runCommand(
      'delete',
      `git -C ${getRepoPath(repoName)} rev-parse --abbrev-ref HEAD`,
    );
  }
}
