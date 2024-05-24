/*
  Warnings:

  - You are about to drop the column `postedBy` on the `flats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "flats" DROP CONSTRAINT "flats_postedBy_fkey";

-- AlterTable
ALTER TABLE "flats" DROP COLUMN "postedBy";
