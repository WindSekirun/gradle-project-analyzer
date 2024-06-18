import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandService } from './command.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('command')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CommandController {
  constructor(private commandService: CommandService) {}

  @ApiBody({
    schema: {
      properties: {
        command: { type: 'string', description: 'Shell command' },
      },
      required: ['command'],
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
  @ApiTags('Command')
  @Post('execute')
  async runCommand(@Body('command') command: string) {
    try {
      const response = await this.commandService.runCommand(command);
      return { result: true, response };
    } catch (error) {
      return { result: false, error };
    }
  }
}
