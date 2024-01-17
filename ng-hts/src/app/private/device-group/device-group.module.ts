import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceGroupRoutingModule } from './device-group-routing.module';
import { DeviceGroupListComponent } from './device-group-list/device-group-list.component';
import { DeviceModule } from '../device/device.module';
import { DeviceGroupService } from './device-group.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DeviceGroupListComponent],
  imports: [
    CommonModule,
    DeviceGroupRoutingModule,
    DeviceModule,
  ],
  providers: [DeviceGroupService],
})
export class DeviceGroupModule {}
