import { Controller, Get, HttpException, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { AuthGuard } from '../auth/auth.guard';
import * as mime from 'mime-types';

@Controller('files')
@UseGuards(AuthGuard)
export class FileController {
  @Get()
  getFiles(@Query('path') path: string = '') {
    const directoryPath = join(__dirname, '..', '..', 'data/', 'repos', path);
    const files = readdirSync(directoryPath).map((file) => {
      const filePath = join(path, file);
      const isDirectory = statSync(join(directoryPath, file)).isDirectory();
      return { name: file, path: filePath, isDirectory };
    });
    return files;
  }

  @Get('content')
  getFileContent(@Query('path') path: string, @Res() res: Response) {
    try {
      const filePath = join(__dirname, '..', '..', 'data', 'repos', path);

      if (!existsSync(filePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      const fileStat = statSync(filePath);

      if (!fileStat.isFile()) {
        throw new HttpException('Not a file', HttpStatus.BAD_REQUEST);
      }

      const mimeType = mime.lookup(filePath) || 'application/octet-stream';
      const fileContent = readFileSync(filePath);
      res.header('Content-Type', mimeType);
      res.send(fileContent);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
}
