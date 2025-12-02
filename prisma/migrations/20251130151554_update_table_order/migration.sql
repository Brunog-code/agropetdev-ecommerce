/*
  Warnings:

  - Added the required column `shippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingCost" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "shippingEta" TEXT,
ADD COLUMN     "shippingType" TEXT,
ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "status" SET DEFAULT 'pending';
