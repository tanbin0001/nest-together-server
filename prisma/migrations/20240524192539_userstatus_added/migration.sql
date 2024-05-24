-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'deactive');

-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
