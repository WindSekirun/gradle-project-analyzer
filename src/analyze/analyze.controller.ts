import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('analyze')
@UseGuards(AuthGuard)
export class AnalyzeController {
  constructor(private analyzeService: AnalyzeService) {}

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        moduleName: { type: 'string', description: 'Module Name (ex, :app)' },
        canonicalName: {
          type: 'string',
          description:
            'PackageName + ClassName (ex, com.google.samples.apps.nowinandroid.feature.bookmarks.BookmarksScreenTest)',
        },
      },
      required: ['repoName', 'moduleName', 'canonicalName'],
    },
  })
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        type: 'string',
        description: 'relative path',
      },
    },
  })
  @ApiTags('Analyze Gradle Project')
  @Post('find/file')
  async findFileInProject(
    @Body('repoName') repoName: string,
    @Body('moduleName') moduleName: string,
    @Body('canonicalName') canonicalName: string,
  ) {
    return this.analyzeService.findFileInModule(repoName, moduleName, canonicalName);
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
      type: 'array',
      items: {
        type: 'object',
        properties: {
          module: { type: 'string' },
          report: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                language: { type: 'string' },
                files: { type: 'number' },
                blank: { type: 'number' },
                conments: { type: 'number' },
                code: { type: 'number' },
                lines: { type: 'number' },
              },
            },
          },
        },
      },
    },
  })
  @ApiTags('Analyze Gradle Project')
  @Post('report/module')
  async generateModuleReport(@Body('repoName') repoName: string) {
    return this.analyzeService.generateModuleReport(repoName);
  }
}
