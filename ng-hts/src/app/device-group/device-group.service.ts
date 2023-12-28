import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceGroup } from './models/device-group.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceGroupService {
  constructor(private httpClient: HttpClient) {}

  listDeviceGroups(): Observable<DeviceGroup[]> {
    return new Observable<DeviceGroup[]>((observer) => {
      setTimeout(() => {
        observer.next([
          {
            devices: [
              {
                id: 1,
                connectionString:
                  'ocvmocvm2yu5inv34uy5vi8b3y4785vyn3487nc56y78346y',
              },
              {
                id: 2,
                connectionString:
                  'c34m80237c5n892347nc59827958c723n985cn7238973987',
              },
            ],
          },
        ]);
      }, 1000);
    });
  }
}
