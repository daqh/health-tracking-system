import { Component } from '@angular/core';
import { DeviceTypeService } from '../device-type.service';
import { Router } from '@angular/router';
import { DeviceType } from '../models/device-type.model';

@Component({
  selector: 'app-device-type-create',
  templateUrl: './device-type-create.component.html',
  styleUrls: ['./device-type-create.component.css'],
})
export class DeviceTypeCreateComponent {
  constructor(
    private deviceTypeService: DeviceTypeService,
    private router: Router
  ) {}

  public deviceType: DeviceType = {
    name: '',
  };

  onSubmit() {
    console.log(this.deviceType);
    this.deviceTypeService.createDeviceType(this.deviceType).subscribe({
      next: (deviceType) => {
        console.log(deviceType);
        this.router.navigate(['/device-type']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
