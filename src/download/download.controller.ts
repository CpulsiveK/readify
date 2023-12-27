import { Controller, Get, Param, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { DownloadService } from './download.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('download')
export class DownloadController {
    constructor(private downloadService: DownloadService) { }

    @Get(':key')
    download(@Param('key') key: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        return this.downloadService.download(key, res);
    }
}
