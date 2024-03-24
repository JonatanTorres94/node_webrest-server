/*
  Warnings:

  - You are about to drop the `QAtodo` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[QAtodo];

-- CreateTable
CREATE TABLE [dbo].[qatodo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] VARCHAR NOT NULL,
    [createdAt] TIME,
    CONSTRAINT [qatodo_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
