import { ForbiddenException, Injectable, StreamableFile } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ProcessingService } from 'src/processing/processing.service';
import * as fs from 'fs';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_S3_REGION!
    });

    constructor(private prismaService: PrismaService, private processingService: ProcessingService) { }

    async uploadFile(user: Object, file: Express.Multer.File): Promise<string> {
        const summary: string = await this.processingService.summarizeFileContent(file);
        const processedAudioResults: { filename: string, filepath: string } = this.processingService.convertSummmaryToAudio(summary, file.originalname);
        const filename = processedAudioResults.filename
        const filepath = processedAudioResults.filepath

        const audio = await this.prismaService.audio.findFirst({
            where: {
                key: filename,
            }
        });

        if (audio) { throw new ForbiddenException("File already exists") }

        const audioBuffer = fs.readFileSync(filepath);

        const s3Upload = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET!,
                Key: filename,
                Body: audioBuffer,
            })
        );

        if (!s3Upload) { throw new ForbiddenException("Could not upload file") }

        return await this.uploadMetadata(user['id'], 5, filename);
    }

    async uploadMetadata(userId: number, filesize: number, key: string): Promise<string> {
        try {
            const audio = await this.prismaService.audio.create({
                data: {
                    userId,
                    filesize,
                    key,
                }
            });

            return audio.key;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException("file already exists");
            }
        }
    }
}