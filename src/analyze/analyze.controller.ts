import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('analyze')
@UseGuards(AuthGuard)
export class AnalyzeController {
  constructor(private analyzeService: AnalyzeService) {}

  @Post('find/file')
  async findFileInProject(
    @Body('repoName') repoName: string,
    @Body('moduleName') moduleName: string,
    @Body('canonicalName') canonicalName: string,
  ) {
    return this.analyzeService.findFileInModule(repoName, moduleName, canonicalName);
  }

  @Post('report/module')
  async generateModuleReport(@Body('repoName') repoName: string) {
    return this.analyzeService.generateModuleReport(repoName);
  }
}
