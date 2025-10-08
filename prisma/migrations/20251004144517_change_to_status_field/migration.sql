/*
  Warnings:

  - You are about to drop the column `inStock` on the `pottery_items` table. All the data in the column will be lost.
  - You are about to drop the column `preorder` on the `pottery_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pottery_items" DROP COLUMN "inStock",
DROP COLUMN "preorder",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'in_stock';
