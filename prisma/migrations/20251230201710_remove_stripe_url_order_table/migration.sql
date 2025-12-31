/*
  Warnings:

  - You are about to drop the column `stripeUrlPaymnt` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_stripeUrlPaymnt_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stripeUrlPaymnt";
