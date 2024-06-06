/*
  Warnings:

  - The `published` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;
