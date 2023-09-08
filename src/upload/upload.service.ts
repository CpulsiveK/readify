import { ForbiddenException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_S3_REGION!
    });

    constructor(private prismaService: PrismaService) { }

    async uploadSingleFile(userId: number, file: Express.Multer.File) {
        try {
            const s3Upload = await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: '',
                    Key: file.originalname,
                    Body: file.buffer
                })
            );
            
            if (s3Upload) {
                const upload = await this.prismaService.upload.create({
                    data: {
                        userId: userId,
                        filename: file.filename,
                        filesize: file.size,
                        key: file.originalname,
                    }
                });

                if (!upload) { throw new ForbiddenException("File already exists") }

                return upload;
            }

        } catch (error) {
            console.log(error);
        }
    }
}