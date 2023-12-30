import { Component, Input, OnInit } from '@angular/core';
import { Device, ListDevice } from '../models/device.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.css'],
})
export class DeviceListItemComponent {
  environment = environment;
  @Input() device!: ListDevice;
}
