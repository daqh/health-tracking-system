import { DeviceType } from "src/app/device-type/models/device-type.model";

export interface Device {
  id?: number;
  connectionString?: string;
  deviceType?: DeviceType;
  deviceTypeId?: number;
}
