import { Component, OnInit } from '@angular/core';
import { CreateDevice, Device } from '../models/device.model';
import { DeviceService } from '../device.service';
import { DeviceTypeService } from 'src/app/private/device-type/device-type.service';
import { DeviceType } from 'src/app/private/device-type/models/device-type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css'],
})
export class DeviceCreateComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private deviceTypeService: DeviceTypeService,
    private router: Router
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
    this.deviceService.createDevice(this.device).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/device', data.prismaDevice.id]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
