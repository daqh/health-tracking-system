import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'device-group',
    loadChildren: () =>
      import('./device-group/device-group.module').then(
        (m) => m.DeviceGroupModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
