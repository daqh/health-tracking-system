import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  constructor(private deviceService: DeviceService) {}

  public devices: Device[] = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.listDevices();
  }

  onRefresh(): void {
    this.devices = [];
    this.listDevices();
  }

  listDevices(): void {
    this.loading = true;
    this.deviceService.listDevices().subscribe({
      next: (v) => {
        this.devices = v;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
