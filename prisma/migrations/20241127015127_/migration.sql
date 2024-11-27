/*
  Warnings:

  - Added the required column `db_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "db_id" INTEGER NOT NULL;
