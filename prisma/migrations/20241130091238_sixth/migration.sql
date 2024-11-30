/*
  Warnings:

  - Made the column `other` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requ` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "other" SET NOT NULL,
ALTER COLUMN "requ" SET NOT NULL;
