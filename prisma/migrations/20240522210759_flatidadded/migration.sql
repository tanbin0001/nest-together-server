-- AlterTable
ALTER TABLE "flats" ADD COLUMN     "postedBy" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "flats" ADD CONSTRAINT "flats_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
