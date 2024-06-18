import { Injectable } from '@nestjs/common';
import { getRepoPath, getScriptsPath } from '../utils/path';
import { join, relative } from 'path';
import * as glob from 'glob';
import { CommandService } from '../command/command.service';

@Injectable()
export class AnalyzeService {
  constructor(private commandService: CommandService) {}

  async generateModuleReport(repoName: string) {
    const command = `python3 ${getScriptsPath('cloc.py')} ${getRepoPath(repoName)} JAVA,KOTLIN,XML test,androidTest`;
    return await this.commandService.runCommand(command);
  }

  findFileInModule(repoName: string, moduleName: string, canonicalName: string): string[] {
    const repoDir = getRepoPath(repoName);
    const moduleDir = join(getRepoPath(repoName), moduleName.replace(/:/g, '/'));
    const packagePath = canonicalName.replace(/\./g, '/').replace(/\/[^\/]*$/, '');
    const className = canonicalName.split('.').pop();
    const extensions = ['kt', 'java'];

    const pattern = join(moduleDir, '**', packagePath, `${className}.*`);
    const files = glob.sync(pattern);

    const result = [];
    for (const file of files) {
      for (const ext of extensions) {
        if (file.endsWith(`.${ext}`)) {
          result.push(relative(repoDir, file));
        }
      }
    }

    return result;
  }
}
