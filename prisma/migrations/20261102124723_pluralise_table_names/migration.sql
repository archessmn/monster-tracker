-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

ALTER TABLE "account" RENAME TO "accounts";

ALTER TABLE "apikey" RENAME TO "apikeys";

ALTER TABLE "session" RENAME TO "sessions";

ALTER TABLE "user" RENAME TO "users";

ALTER TABLE "verification" RENAME TO "verifications";

-- AlterTable
ALTER TABLE "accounts" RENAME CONSTRAINT "account_pkey" TO "accounts_pkey";

-- AlterTable
ALTER TABLE "apikeys" RENAME CONSTRAINT "apikey_pkey" TO "apikeys_pkey";

-- AlterTable
ALTER TABLE "sessions" RENAME CONSTRAINT "session_pkey" TO "sessions_pkey";

-- AlterTable
ALTER TABLE "users" RENAME CONSTRAINT "user_pkey" TO "users_pkey";

-- AlterTable
ALTER TABLE "verifications" RENAME CONSTRAINT "verification_pkey" TO "verifications_pkey";

-- RenameIndex
ALTER INDEX "account_userId_idx" RENAME TO "accounts_userId_idx";

-- RenameIndex
ALTER INDEX "apikey_configId_idx" RENAME TO "apikeys_configId_idx";

-- RenameIndex
ALTER INDEX "apikey_key_idx" RENAME TO "apikeys_key_idx";

-- RenameIndex
ALTER INDEX "apikey_referenceId_idx" RENAME TO "apikeys_referenceId_idx";

-- RenameIndex
ALTER INDEX "session_token_key" RENAME TO "sessions_token_key";

-- RenameIndex
ALTER INDEX "session_userId_idx" RENAME TO "sessions_userId_idx";

-- RenameIndex
ALTER INDEX "user_email_key" RENAME TO "users_email_key";

-- RenameIndex
ALTER INDEX "verification_identifier_idx" RENAME TO "verifications_identifier_idx";


-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
