/*
  Warnings:

  - You are about to alter the column `createdAt` on the `qatodo` table. The data in that column could be lost. The data in that column will be cast from `Time` to `DateTime`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[qatodo] ALTER COLUMN [createdAt] DATETIME NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
