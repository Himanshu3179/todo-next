/*
  Warnings:

  - The `status` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `title` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Open', 'InProgress', 'Done');

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "title" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Open';
