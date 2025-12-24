/*
  Warnings:

  - The `shippingType` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('PAC', 'SEDEX');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingType",
ADD COLUMN     "shippingType" "ShippingMethod";
