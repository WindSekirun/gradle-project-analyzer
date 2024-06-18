import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { GitModule } from 'src/git/git.module';

@Module({
  imports: [GitModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
