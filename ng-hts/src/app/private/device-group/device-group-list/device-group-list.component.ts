import { Component, OnInit } from '@angular/core';
import { DeviceGroupService } from '../device-group.service';
import { DeviceGroup } from '../models/device-group.model';

@Component({
  selector: 'app-device-group-list',
  templateUrl: './device-group-list.component.html',
  styleUrls: ['./device-group-list.component.css'],
})
export class DeviceGroupListComponent implements OnInit {
  constructor(private deviceGroupService: DeviceGroupService) {}

  deviceGroups: DeviceGroup[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.listDeviceGroups();
  }

  listDeviceGroups() {
    // this.deviceGroupService.listDeviceGroups().subscribe({
    //   next: (deviceGroups) => {
    //     this.deviceGroups = deviceGroups;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
  }

  onRefresh() {
    this.listDeviceGroups();
  }

}
