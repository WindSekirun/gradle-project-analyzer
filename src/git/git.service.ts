import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { CommandService } from '../command/command.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GitService {
  constructor(
    private commandService: CommandService,
    private prismaService: PrismaService,
  ) {}

  async cloneRepository(repoName: string, repoUrl: string): Promise<string> {
    const localPath = join(__dirname, '..', 'repos', repoName);
    const clone = `git clone ${repoUrl} ${localPath}`;
    await this.commandService.runCommand('clone', clone);

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
