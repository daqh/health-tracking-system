import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceTypeListComponent } from './device-type-list/device-type-list.component';
import { DeviceTypeCreateComponent } from './device-type-create/device-type-create.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceTypeListComponent,
  },
  {
    path: 'create',
    component: DeviceTypeCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceTypeRoutingModule {}
