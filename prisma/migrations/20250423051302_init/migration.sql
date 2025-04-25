-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'customer', 'seller');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'customer';
