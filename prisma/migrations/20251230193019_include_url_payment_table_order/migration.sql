/*
  Warnings:

  - A unique constraint covering the columns `[stripeUrlPaymnt]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeUrlPaymnt" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeUrlPaymnt_key" ON "Order"("stripeUrlPaymnt");
