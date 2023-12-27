import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ProcessingService } from 'src/processing/processing.service';

@Module({
  imports: [MulterModule.register(),],
  controllers: [UploadController],
  providers: [UploadService, ProcessingService]
})
export class UploadModule {}
