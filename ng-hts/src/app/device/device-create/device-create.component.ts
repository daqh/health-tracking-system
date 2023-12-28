import { Component } from '@angular/core';
import { Device } from '../models/device.model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css'],
})
export class DeviceCreateComponent {
  constructor(private deviceService: DeviceService) {}
  public device: Device = {
    connectionString: undefined,
    deviceTypeId: undefined,
  };

  onSubmit() {
    this.deviceService.createDevice(this.device).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
