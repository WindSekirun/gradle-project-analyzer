import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async getProjectList() {
    return await this.prismaService.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
