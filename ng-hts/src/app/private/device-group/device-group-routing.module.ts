import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceGroupListComponent } from './device-group-list/device-group-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceGroupListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceGroupRoutingModule {}
