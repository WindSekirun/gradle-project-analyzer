import { DynamicModule, Global, Logger, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global()
@Module({})
export class PrismaModule {
  constructor(private readonly prismaService: PrismaService) {}

  static forRoot(): DynamicModule {
    Logger.debug(`Initializing PrismaModule as DynamicModule`);
    const providers = [PrismaService];

    return {
      module: PrismaModule,
      providers,
      exports: [PrismaService],
    };
  }
}
