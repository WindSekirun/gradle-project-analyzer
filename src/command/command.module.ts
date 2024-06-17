import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { LogsGateway } from '../socket/log.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CommandService, LogsGateway],
})
export class CommandModule {}
