/*
  Warnings:

  - You are about to drop the `summaries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "summaries" DROP CONSTRAINT "summaries_userId_fkey";

-- DropTable
DROP TABLE "summaries";
