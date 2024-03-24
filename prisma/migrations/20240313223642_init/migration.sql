BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[QAtodo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] VARCHAR NOT NULL,
    [createdAt] TIME,
    CONSTRAINT [QAtodo_pkey] PRIMARY KEY CLUSTERED ([id])
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