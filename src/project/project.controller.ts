import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/auth.guard';
import { exec } from '../utils/exec';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProjectList() {
    return await this.projectService.getProjectList();
  }

  @Post('update')
  async updateAllProjects() {
    return await this.projectService.updateAllProjects();
  }

  @Post('update/:repoName')
  async updateProjects(@Param('repoName') repoName: string) {
    return await this.projectService.updateProject(repoName);
  }

  @Post('delete')
  async delete(@Body('repoName') repoName: string) {
    return exec(async () => await this.projectService.deleteProject(repoName));
  }
}
