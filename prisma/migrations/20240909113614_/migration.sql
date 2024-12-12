/*
  Warnings:

  - The `location` column on the `businesses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "businesses" DROP COLUMN "location",
ADD COLUMN     "location" DOUBLE PRECISION[];
