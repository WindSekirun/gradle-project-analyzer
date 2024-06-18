import { Body, Controller, DefaultValuePipe, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GitService } from './git.service';
import { exec } from '../utils/exec';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('git')
@UseGuards(AuthGuard)
export class GitController {
  constructor(private gitService: GitService) {}

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        repoUrl: { type: 'string', description: 'Remote origin url' },
      },
      required: ['repoName', 'repoUrl'],
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
  @ApiTags('Git operations')
  @Post('clone')
  async clone(@Body('repoName') repoName: string, @Body('repoUrl') repoUrl: string) {
    return exec(async () => await this.gitService.clone(repoName, repoUrl));
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
  @ApiTags('Git operations')
  @Post('pull')
  async pull(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.pull(repoName));
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
  @ApiTags('Git operations')
  @Post('fetch')
  async fetch(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.fetch(repoName));
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
  @ApiTags('Git operations')
  @Post('status')
  async status(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.status(repoName));
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
  @ApiTags('Git operations')
  @Post('branch/get')
  async getCurrentBranch(@Body('repoName') repoName: string) {
    return exec(async () => await this.gitService.getCurrentBranch(repoName));
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        branchName: { type: 'string', description: 'Branch Name' },
      },
      required: ['repoName', 'branchName'],
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
  @ApiTags('Git operations')
  @Post('branch/delete')
  async deleteBranch(@Body('repoName') repoName: string, @Body('branchName') branchName: string) {
    return exec(async () => await this.gitService.deleteBranch(repoName, branchName));
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        tagName: { type: 'string', description: 'Tag Name' },
      },
      required: ['repoName', 'tagName'],
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
  @ApiTags('Git operations')
  @Post('tag')
  async tag(@Body('repoName') repoName: string, @Body('tagName') tagName: string) {
    return exec(async () => await this.gitService.tag(repoName, tagName));
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        tagName: { type: 'string', description: 'Tag Name' },
      },
      required: ['repoName', 'tagName'],
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
  @ApiTags('Git operations')
  @Post('tag/delete')
  async deleteTag(@Body('repoName') repoName: string, @Body('tagName') tagName: string) {
    return exec(async () => await this.gitService.deleteTag(repoName, tagName));
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        newBranch: { type: 'string', description: 'Branch Name' },
        ref: {
          type: 'string',
          description: 'create branch from provided ref (other branch, tag, commit hash) if exists.',
        },
      },
      required: ['repoName', 'newBranch'],
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
  @ApiTags('Git operations')
  @Post('checkout')
  async checkout(@Body('repoName') repoName: string, @Body('newBranch') newBranch: string, @Body('ref') ref?: string) {
    return exec(async () => await this.gitService.checkout(repoName, newBranch, ref));
  }

  @ApiBody({
    schema: {
      properties: {
        repoName: { type: 'string', description: 'Project Name' },
        relativePath: { type: 'string', description: 'Relative Path of file' },
        size: { type: 'number', description: 'Size of logs' },
      },
      required: ['repoName', 'relativePath'],
    },
  })
  @ApiResponse({
    schema: {
      properties: {
        result: { type: 'boolean', description: 'Result' },
        response: {
          type: 'object',
          properties: {
            hash: { type: 'string', description: 'The hash of the git commit' },
            authorName: { type: 'string', description: 'The name of the author' },
            authorEmail: { type: 'string', description: 'The email of the author' },
            message: { type: 'string', description: 'The commit message' },
          },
        },
      },
    },
  })
  @ApiTags('Git operations')
  @Post('log')
  async log(
    @Body('repoName') repoName: string,
    @Body('relativePath') relativePath: string,
    @Body('size', new DefaultValuePipe(10), new ParseIntPipe())
    size?: number,
  ) {
    return exec(async () => await this.gitService.log(repoName, relativePath, size));
  }
}
