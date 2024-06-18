import { Module } from '@nestjs/common';
import { GitService } from './git.service';
import { GitController } from './git.controller';
import { CommandModule } from '../command/command.module';

@Module({
  imports: [CommandModule],
  providers: [GitService],
  controllers: [GitController],
  exports: [GitService],
})
export class GitModule {}
