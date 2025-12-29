/*
  Warnings:

  - Made the column `shippingType` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shippingEta` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shippingType" SET NOT NULL,
ALTER COLUMN "shippingEta" SET NOT NULL;
