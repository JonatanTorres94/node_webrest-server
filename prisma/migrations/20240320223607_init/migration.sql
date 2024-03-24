BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[users_lotery] ADD [email_validated] BIT NOT NULL CONSTRAINT [users_lotery_email_validated_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
