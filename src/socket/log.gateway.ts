import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  path: '/api/command/output',
  cors: { origin: '*', methods: ['GET', 'POST'] },
})
export class LogsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly authService: AuthService) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers['authorization']?.split(' ')[1];
    if (!token || !this.authService.validateToken(token)) {
      client.disconnect();
      throw new UnauthorizedException('Invalid token');
    }
    Logger.log(`Client connected: ${client.id}`, 'LogGateway');
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`, 'LogGateway');
  }

  sendLogMessage(id: string, message: string) {
    this.server.emit('log', { id, message });
  }
}
