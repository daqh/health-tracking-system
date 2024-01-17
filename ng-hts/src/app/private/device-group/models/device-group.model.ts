import { Device } from 'src/app/private/device/models/device.model';

export class DeviceGroup {
  constructor(public devices: Device[]) {}
}
