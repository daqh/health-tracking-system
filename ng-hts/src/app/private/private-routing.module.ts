import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'device',
        loadChildren: () =>
          import('./device/device.module').then((m) => m.DeviceModule),
      },
      {
        path: 'device-type',
        loadChildren: () =>
          import('./device-type/device-type.module').then(
            (m) => m.DeviceTypeModule
          ),
      },
      {
        path: 'device-group',
        loadChildren: () =>
          import('./device-group/device-group.module').then(
            (m) => m.DeviceGroupModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
