import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { CommandService } from '../command/command.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GitService {
  constructor(
    private commandService: CommandService,
    private prismaService: PrismaService,
  ) {}

  async deleteRepository(repoName: string) {
    const localPath = join(__dirname, '..', 'repos', repoName);
    await this.commandService.runCommand('delete', `rm -rf ${localPath}`);
    return await this.prismaService.project.delete({
      where: {
        repoName,
      },
    });
  }

  async cloneRepository(repoName: string, repoUrl: string): Promise<string> {
    const localPath = join(__dirname, '..', 'repos', repoName);
    await this.commandService.runCommand('clone', `git clone ${repoUrl} ${localPath}`);
    const currentBranch = await this.commandService.runCommand(
      'branch',
      `git -C ${localPath} rev-parse --abbrev-ref HEAD`,
    );

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
}
