import { Measure } from "../../measure/models/measure.model";

export interface ListPrismaDeviceDeviceType {
  id: number;
  name: string;
}

export interface ListPrismaDevice {
  id: number;
  deviceTypeId: number;
  deviceGroupId: number | null;
  deviceType: ListPrismaDeviceDeviceType;
}

export interface ListRegistryDevice {
  deviceId: string;
  generationId: string;
  etag: string;
  connectionState: string;
  status: string;
  statusReason: string;
  connectionStateUpdatedTime: string;
  statusUpdatedTime: string;
  lastActivityTime: string;
  cloudToDeviceMessageCount: number;
  capabilities: {
    iotEdge: boolean;
  };
  authentication: {
    symmetricKey: {
      primaryKey: string;
      secondaryKey: string;
    };
    x509Thumbprint: {
      primaryThumbprint: string;
      secondaryThumbprint: string;
    };
    type: string;
    SymmetricKey: {
      primaryKey: string;
      secondaryKey: string;
    };
  };
  
}

export interface ListDevice {
  prismaDevice: ListPrismaDevice;
  registryDevice: ListRegistryDevice;
}

export interface CreateDevice {
  deviceTypeId?: number;
}

export interface UpdateDevice {
  id: number;
  deviceTypeId?: number;
}

export interface Device {
  prismaDevice: ListPrismaDevice,
  registriesDevice: ListRegistryDevice
}

export interface PrismaDeviceDetial extends ListPrismaDevice {
  measures: Measure[];
}

export interface DeviceDetail {
  prismaDevice: PrismaDeviceDetial;
  registryDevice: ListRegistryDevice;
}