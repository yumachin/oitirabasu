/*
  Warnings:

  - Changed the type of `span` on the `Subject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "span",
ADD COLUMN     "span" INTEGER NOT NULL;
