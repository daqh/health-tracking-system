
export class Device {

    public readonly connectionString: string;
    public readonly deviceTypeId: number;
    
    constructor(connectionString: string, deviceTypeId) {
        this.connectionString = connectionString;
        this.deviceTypeId = deviceTypeId;
    }

}
