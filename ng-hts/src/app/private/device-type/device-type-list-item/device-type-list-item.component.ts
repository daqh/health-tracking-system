import { Component, Input } from '@angular/core';
import { DeviceType } from '../models/device-type.model';

@Component({
  selector: 'app-device-type-list-item',
  templateUrl: './device-type-list-item.component.html',
  styleUrls: ['./device-type-list-item.component.css'],
})
export class DeviceTypeListItemComponent {
  @Input()
  public deviceType!: DeviceType;
}
