-- CreateTable
CREATE TABLE "drink_logs" (
    "id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" INTEGER,
    "longitude" INTEGER,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drink_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drink_logs" ADD CONSTRAINT "drink_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
