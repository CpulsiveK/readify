import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import * as summarize from 'text-summarization';
import * as gTTS from 'gtts';

@Injectable()
export class ProcessingService {
    async summarizeFileContent(file: Express.Multer.File): Promise<string> {
        const buffer = await pdf(file.buffer);
        const text: string = buffer.text;

        const result = await summarize({ text });
        const summary = result.extractive;
        const textSummary = summary.join('\n');

        return textSummary;
    }

    convertSummmaryToAudio(summary: string, filename: string): {filename: string, filepath: string} {
        filename = filename.split('.').slice(0, -1).join('.');
        filename = `${filename}.mp3`;

        const gtts = new gTTS(summary, 'en');

        const filepath = `./temp/${filename}`;

        gtts.save(filepath, (err, result) => {
            if (err) { throw new Error(err) }
        });

        return {
            filename,
            filepath,
        }
    }
}
