/*
  Warnings:

  - You are about to drop the column `imageLink` on the `flats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flats" DROP COLUMN "imageLink",
ADD COLUMN     "imageLinks" TEXT[];
