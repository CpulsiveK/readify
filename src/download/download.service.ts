import { ForbiddenException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class DownloadService {
  constructor(private prismaService: PrismaService) {}

  async download(key: string, res: Response): Promise<{ url: string }> {
    try {
      const audio = await this.prismaService.audio.findFirst({
        where: {
          key: key,
        },
      });

      if (!audio) {
        throw new ForbiddenException('File does not exist');
      }

      return {
        url:
          'https://' +
          process.env.AWS_BUCKET +
          '.s3' +
          process.env.AWS_S3_REGION +
          'amazonaws.com/' +
          key,
      };
    } catch (error) {}
  }
}
