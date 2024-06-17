import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GitService } from './git.service';

@Controller('git')
@UseGuards(AuthGuard)
export class GitController {
  constructor(private gitService: GitService) {}

  @Post('clone')
  async cloneRepository(@Body('repoName') repoName: string, @Body('repoUrl') repoUrl: string) {
    try {
      const response = await this.gitService.cloneRepository(repoName, repoUrl);
      return { result: true, response };
    } catch (error) {
      return { result: false, error };
    }
  }
}
