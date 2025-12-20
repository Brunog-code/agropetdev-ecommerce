/*
  Warnings:

  - Added the required column `nameNormalized` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "nameNormalized" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Product_nameNormalized_idx" ON "Product"("nameNormalized");
