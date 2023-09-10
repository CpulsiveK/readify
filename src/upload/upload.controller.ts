import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GetUser } from 'src/decorators';


@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {}

    @Post('single')
    @UseInterceptors(FileInterceptor('file'))
    uploadSingleFile(@GetUser('id') user: Object, @UploadedFile(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: 'pdf',
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) 
    file: Express.Multer.File) {
        return this.uploadService.uploadSingleFile(user, file);
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('files'))
    uploadMultipleFiles(@GetUser('id') user: Object, @UploadedFiles(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: 'pdf',
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    ) files: Array<Express.Multer.File>) {
        return this.uploadService.uploadMultipleFile(user, files);
    }

}
