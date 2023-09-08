import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GetUser } from 'src/decorators';


@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {}

    @Post('single')
    @UseInterceptors(FileInterceptor('file'))
    uploadSingleFile(@GetUser('id') userId: number, @UploadedFile(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: 'pdf',
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) 
    file: Express.Multer.File) {
        return this.uploadService.uploadSingleFile(userId, file);
    }

    @Post('multiple')
    uploadMultipleFiles() {}

}
