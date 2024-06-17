import { Module } from '@nestjs/common';
import { GitService } from './git.service';
import { GitController } from './git.controller';
import { CommandModule } from 'src/command/command.module';

@Module({
  imports: [CommandModule],
  providers: [GitService],
  controllers: [GitController],
})
export class GitModule {}