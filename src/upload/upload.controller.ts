import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GetUser } from 'src/decorators';


@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingleFile(@GetUser('id') user: Object, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'pdf',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            })
    )
    file: Express.Multer.File): Promise<string> {
        return this.uploadService.uploadFile(user, file);
    }
}
