import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { LogsGateway } from '../socket/log.gateway';
import { AuthModule } from '../auth/auth.module';
import { CommandController } from './command.controller';

@Module({
  imports: [AuthModule],
  providers: [CommandService, LogsGateway],
  controllers: [CommandController],
})
export class CommandModule {}
