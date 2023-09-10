import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import * as summarize from 'text-summarization';

@Injectable()
export class ProcessingService {
    async processFile(file: Express.Multer.File): Promise<Array<string>> {
        const buffer = await pdf(file.buffer);
        const text: string = buffer.text;

        const summary = await summarize({ text });

        return summary.extractive;
    }

    async processFiles(files: Array<Express.Multer.File>):Promise<Array<Array<string>>> {
        let summaries: Array<Array<string>> = [];

        for (const file of files) {
            const buffer = await pdf(file.buffer);
            const text: string = buffer.text;

            const summary = await summarize({ text });

            summaries.push(summary.extractive);
        }

        return summaries;
    }
}
