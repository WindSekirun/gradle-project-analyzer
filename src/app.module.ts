import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from './command/command.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from './prisma/prisma.module';
import { GitModule } from './git/git.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    CommandModule,
    ProjectModule,
    PrismaModule.forRoot(),
    GitModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'data/', 'repos'),
      serveRoot: '/repos',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
