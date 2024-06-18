import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import { GitModule } from 'src/git/git.module';
import { CommandModule } from 'src/command/command.module';

@Module({
  imports: [GitModule, CommandModule],
  providers: [AnalyzeService],
  controllers: [AnalyzeController],
})
export class AnalyzeModule {}
