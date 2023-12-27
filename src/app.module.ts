import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma-client/prisma.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { ProcessingModule } from './processing/processing.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, UploadModule, ProcessingModule, DownloadModule],
})
export class AppModule {}
