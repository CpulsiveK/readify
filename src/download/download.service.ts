import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ForbiddenException, Injectable, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class DownloadService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_S3_REGION!,
    });

    constructor(private prismaService: PrismaService) {}

    async download(key: string, res: Response): Promise<StreamableFile> {
        const audio = await this.prismaService.audio.findFirst({
            where: {
                key: key,
            }
        });

        if (!audio) { throw new ForbiddenException("File does not exist")}

        const download = await this.s3Client.send(
            new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET!,
                Key: key,
            })
        );

        const file = await download.Body.transformToByteArray();

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': `attachment; filename="${key}"`,
        });

        return new StreamableFile(file);
    }
}