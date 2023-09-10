/*
  Warnings:

  - You are about to drop the column `filename` on the `summaries` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `summarizedAudio` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `uploads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "summaries" DROP COLUMN "filename";

-- AlterTable
ALTER TABLE "summarizedAudio" DROP COLUMN "filename";

-- AlterTable
ALTER TABLE "uploads" DROP COLUMN "filename";
