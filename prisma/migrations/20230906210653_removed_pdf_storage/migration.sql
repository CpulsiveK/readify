/*
  Warnings:

  - You are about to drop the `summarizedPdfs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "summarizedPdfs" DROP CONSTRAINT "summarizedPdfs_userId_fkey";

-- DropTable
DROP TABLE "summarizedPdfs";

-- CreateTable
CREATE TABLE "summaries" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filename" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "summaries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
