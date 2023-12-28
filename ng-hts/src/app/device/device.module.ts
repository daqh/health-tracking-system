import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { DeviceService } from './device.service';
import { HttpClientModule } from '@angular/common/http';
import { DeviceListItemComponent } from './device-list-item/device-list-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceDetailComponent,
    DeviceCreateComponent,
    DeviceListItemComponent,
  ],
  imports: [CommonModule, DeviceRoutingModule, HttpClientModule, FormsModule],
  providers: [DeviceService],
  exports: [DeviceListItemComponent],
})
export class DeviceModule {}
