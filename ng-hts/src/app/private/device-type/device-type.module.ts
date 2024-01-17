import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceTypeRoutingModule } from './device-type-routing.module';
import { DeviceTypeListComponent } from './device-type-list/device-type-list.component';
import { DeviceTypeCreateComponent } from './device-type-create/device-type-create.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeviceTypeService } from './device-type.service';
import { DeviceTypeListItemComponent } from './device-type-list-item/device-type-list-item.component';

@NgModule({
  declarations: [DeviceTypeListComponent, DeviceTypeCreateComponent, DeviceTypeListItemComponent],
  imports: [
    CommonModule,
    DeviceTypeRoutingModule,
    FormsModule,
  ],
  providers: [DeviceTypeService],
})
export class DeviceTypeModule {}
