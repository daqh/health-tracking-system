BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DeviceType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [DeviceType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Device] (
    [id] INT NOT NULL IDENTITY(1,1),
    [connectionString] NVARCHAR(1000) NOT NULL,
    [deviceTypeId] INT NOT NULL,
    CONSTRAINT [Device_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Device] ADD CONSTRAINT [Device_deviceTypeId_fkey] FOREIGN KEY ([deviceTypeId]) REFERENCES [dbo].[DeviceType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
