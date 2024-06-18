import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GitService } from '../git/git.service';

@Injectable()
export class ProjectService {
  constructor(
    private gitService: GitService,
    private prismaService: PrismaService,
  ) {}

  async getProjectList() {
    return await this.prismaService.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateAllProjects() {
    const projects = await this.getProjectList();
    projects.forEach(async (project) => {
      await this.gitService.updateProject(project.repoName);
    });
  }

  async updateProject(repoName: string) {
    return await this.gitService.updateProject(repoName);
  }

  async deleteProject(repoName: string) {
    await this.gitService.delete(repoName);
    return await this.prismaService.project.delete({
      where: {
        repoName,
      },
    });
  }
}
