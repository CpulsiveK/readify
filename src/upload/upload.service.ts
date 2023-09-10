import { ForbiddenException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_S3_REGION!
    });

    constructor(private prismaService: PrismaService) { }

    async uploadSingleFile(user: Object, file: Express.Multer.File) {
        const s3Upload = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'readifybucket',
                Key: file.originalname,
                Body: file.buffer
            })
        );

        if (!s3Upload) { throw new ForbiddenException("Could not upload file") }
        
        return this.uploadMetadata(user['id'], file.size, file.originalname);
    }

    async uploadMultipleFile(user: Object, files: Array<Express.Multer.File>) {
        files.forEach(async file => {
            const s3Upload = await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: 'readifybucket',
                    Key: file.originalname,
                    Body: file.buffer
                })
            );
    
            if (!s3Upload) { throw new ForbiddenException("Could not upload file") }
            
            return this.uploadMetadata(user['id'], file.size, file.originalname); 
        });
    }

    async uploadMetadata(userId: number, filesize: number, key: string): Promise<number> {
        try {
            const upload = await this.prismaService.upload.create({
                data: {
                    userId,
                    filesize,
                    key,
                }
            });
            
            return upload.id;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException("file already exists");
            }
        }
    }
}