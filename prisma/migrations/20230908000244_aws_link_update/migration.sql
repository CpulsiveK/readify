/*
  Warnings:

  - Added the required column `link` to the `summaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `summarizedAudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summaries" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "summarizedAudio" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "uploads" ADD COLUMN     "link" TEXT NOT NULL;
