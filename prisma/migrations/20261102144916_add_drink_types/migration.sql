-- CreateTable
CREATE TABLE "drink_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "caffeine_100ml" INTEGER NOT NULL,
    "total_ml" INTEGER NOT NULL,
    "brand_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drink_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drink_types" ADD CONSTRAINT "drink_types_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "drink_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
