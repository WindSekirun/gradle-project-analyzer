import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly authToken: string;

  constructor(private readonly configService: ConfigService) {
    this.authToken = this.configService.get<string>('AUTH_TOKEN');
  }

  validateToken(token: string): boolean {
    return token === this.authToken;
  }
}