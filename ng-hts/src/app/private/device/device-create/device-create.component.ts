import { Component, OnInit } from '@angular/core';
import { CreateDevice, Device } from '../models/device.model';
import { DeviceService } from '../device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css'],
})
export class DeviceCreateComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private router: Router
  ) {}
  public device: CreateDevice = {
    deviceTypeId: 0,
  };

  ngOnInit(): void {
    
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
