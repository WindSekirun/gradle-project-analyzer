import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProjectList() {
    return await this.projectService.getProjectList();
  }
}
