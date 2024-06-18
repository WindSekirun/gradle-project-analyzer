import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandService } from './command.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('command')
@UseGuards(AuthGuard)
export class CommandController {
  constructor(private commandService: CommandService) {}

  @Post('execute')
  async runCommand(@Body('id') id: string, @Body('command') command: string) {
    try {
      const response = await this.commandService.runCommand(command);
      return { result: true, response };
    } catch (error) {
      return { result: false, error };
    }
  }
}
