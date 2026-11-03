-- CreateTable
CREATE TABLE "drink_types_barcodes" (
    "id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drink_types_barcodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drink_types_barcodes_barcode_key" ON "drink_types_barcodes"("barcode");

-- AddForeignKey
ALTER TABLE "drink_types_barcodes" ADD CONSTRAINT "drink_types_barcodes_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "drink_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
