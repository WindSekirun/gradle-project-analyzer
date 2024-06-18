import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/auth.guard';
import { exec } from '../utils/exec';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          repoName: { type: 'string' },
          origin: { type: 'string' },
          defaultBranch: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  })
  @ApiTags('Projects')
  @Get()
  async getProjectList() {
    return await this.projectService.getProjectList();
  }

  @ApiTags('Projects')
  @Post('update')
  async updateAllProjects() {
    return await this.projectService.updateAllProjects();
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
      },
      required: ['repoName'],
    },
  })
  @ApiResponse({
    schema: {
      properties: {
        result: { type: 'boolean', description: 'Result' },
        response: { type: 'string', description: 'stdout of command' },
      },
    },
  })
  @ApiTags('Projects')
  @Post('update/:repoName')
  async updateProjects(@Param('repoName') repoName: string) {
    return exec(async () => await this.projectService.updateProject(repoName));
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
      },
      required: ['repoName'],
    },
  })
  @ApiResponse({
    schema: {
      properties: {
        result: { type: 'boolean', description: 'Result' },
        response: { type: 'string', description: 'stdout of command' },
      },
    },
  })
  @ApiTags('Projects')
  @Post('delete')
  async delete(@Body('repoName') repoName: string) {
    return exec(async () => await this.projectService.deleteProject(repoName));
  }
}
