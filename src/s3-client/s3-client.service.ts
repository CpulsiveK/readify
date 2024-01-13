import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3ClientService {
    readonly s3Client:S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_S3_REGION!
        })
    }
}
