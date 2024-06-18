import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import { GitModule } from '../git/git.module';
import { CommandModule } from '../command/command.module';

@Module({
  imports: [GitModule, CommandModule],
  providers: [AnalyzeService],
  controllers: [AnalyzeController],
})
export class AnalyzeModule {}
