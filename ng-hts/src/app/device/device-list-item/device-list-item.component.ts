import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.css']
})
export class DeviceListItemComponent {

  @Input() device!: Device;

}
