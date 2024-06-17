import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GitService } from './git.service';
import { exec } from '../utils/exec';

@Controller('git')
@UseGuards(AuthGuard)
export class GitController {
  constructor(private gitService: GitService) {}

  @Post('clone')
  async clone(@Body('repoName') repoName: string, @Body('repoUrl') repoUrl: string) {
    return exec(async () => await this.gitService.clone(repoName, repoUrl));
  }

  @Post('delete')
  async delete(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.delete(repoName));
  }

  @Post('pull')
  async pull(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.pull(repoName));
  }

  @Post('fetch')
  async fetch(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.fetch(repoName));
  }

  @Post('status')
  async status(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.status(repoName));
  }

  @Post('branch/get')
  async getCurrentBranch(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.getCurrentBranch(repoName));
  }

  @Post('checkout')
  async checkout(@Body('repoName') repoName: string, @Body('newBranch') newBranch: string, @Body('ref') ref: string) {
    return exec(async () => await this.gitService.checkout(repoName, newBranch, ref));
  }
}
