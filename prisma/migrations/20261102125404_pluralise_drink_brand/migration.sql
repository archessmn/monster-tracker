/*
  Warnings:

  - You are about to drop the `drink_brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "drink_brand";

-- CreateTable
CREATE TABLE "drink_brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drink_brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drink_brands_slug_key" ON "drink_brands"("slug");
