/*
  Warnings:

  - You are about to drop the column `link` on the `summaries` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `summarizedAudio` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `uploads` table. All the data in the column will be lost.
  - Added the required column `key` to the `summaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `summarizedAudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summaries" DROP COLUMN "link",
ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "summarizedAudio" DROP COLUMN "link",
ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "uploads" DROP COLUMN "link",
ADD COLUMN     "key" TEXT NOT NULL;
