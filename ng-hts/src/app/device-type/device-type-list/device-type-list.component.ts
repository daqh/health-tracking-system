import { Component, OnInit } from '@angular/core';
import { DeviceTypeService } from '../device-type.service';
import { DeviceType } from '../models/device-type.model';

@Component({
  selector: 'app-device-type-list',
  templateUrl: './device-type-list.component.html',
  styleUrls: ['./device-type-list.component.css'],
})
export class DeviceTypeListComponent implements OnInit {
  constructor(public deviceTypeService: DeviceTypeService) {}

  public deviceTypes: DeviceType[] = [];
  public loading = false;

  ngOnInit(): void {
    this.listDeviceTypes();
  }

  onRefresh() {
    this.deviceTypes = [];
    this.listDeviceTypes();
  }

  listDeviceTypes() {
    this.loading = true;
    this.deviceTypeService.listDeviceTypes().subscribe({
      next: (deviceTypes) => {
        this.deviceTypes = deviceTypes;
      },
      error: (err) => {
        console.error(err);
      },
    }).add(() => {
      this.loading = false;
    });
  }
}
