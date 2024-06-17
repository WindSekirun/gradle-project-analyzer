import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { LogsGateway } from '../socket/log.gateway';

@Injectable()
export class CommandService {
  constructor(private readonly logsGateway: LogsGateway) {}

  async runCommand(logId: string, command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const cmd = exec(command);
      let output = '';

      cmd.stdout.on('data', (data) => {
        const message = data.toString();
        output += message;
        this.logsGateway.sendLogMessage(logId, message);
      });

      cmd.stderr.on('data', (data) => {
        const message = data.toString();
        output += message;
        this.logsGateway.sendLogMessage(logId, message);
      });

      cmd.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Command failed with code ${code}`);
        }
      });

      cmd.on('error', (err) => {
        reject(`Command execution failed: ${err.message}`);
      });
    });
  }
}
