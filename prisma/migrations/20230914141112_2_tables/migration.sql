/*
  Warnings:

  - You are about to drop the `summarizedAudio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uploads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "summarizedAudio" DROP CONSTRAINT "summarizedAudio_userId_fkey";

-- DropForeignKey
ALTER TABLE "uploads" DROP CONSTRAINT "uploads_userId_fkey";

-- DropTable
DROP TABLE "summarizedAudio";

-- DropTable
DROP TABLE "uploads";

-- CreateTable
CREATE TABLE "audio" (
    "id" SERIAL NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filesize" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "audio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audio" ADD CONSTRAINT "audio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
