import { Component, OnInit } from '@angular/core';
import { CreateDevice, Device } from '../models/device.model';
import { DeviceService } from '../device.service';
import { DeviceTypeService } from 'src/app/private/device-type/device-type.service';
import { DeviceType } from 'src/app/private/device-type/models/device-type.model';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css'],
})
export class DeviceCreateComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private deviceTypeService: DeviceTypeService
  ) {}
  public device: CreateDevice = {
    deviceTypeId: 0,
  };
  public deviceTypes: DeviceType[] = [];

  ngOnInit(): void {
    this.deviceTypeService.listDeviceTypes().subscribe({
      next: (data) => {
        console.table(data);
        this.deviceTypes = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    console.log(this.device);
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
