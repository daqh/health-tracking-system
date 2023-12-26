import { Routes } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceTypeListComponent } from './device-type-list/device-type-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'device',
    title: 'Device List',
    component: DeviceListComponent,
  },
  {
    path: 'device/:id',
    title: 'Device Detail',
    component: DeviceDetailComponent,
  },
  {
    path: 'device-type',
    title: 'Device Type List',
    component: DeviceTypeListComponent,
  },
  {
    path: 'device-type/:id',
    title: 'Device Type Detail',
    component: DeviceDetailComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];
