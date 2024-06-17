import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from './command/command.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, CommandModule, ProjectModule, PrismaModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
