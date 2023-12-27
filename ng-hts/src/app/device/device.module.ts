import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceCreateComponent } from './device-create/device-create.component';

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceDetailComponent,
    DeviceCreateComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
