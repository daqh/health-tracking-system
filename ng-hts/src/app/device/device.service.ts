import { Injectable } from '@angular/core';
import { Device } from './models/device.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  public listDevices(): Observable<Device[]> {
    // return this.httpClient.get<Device[]>('http://localhost:3000/devices');
    return new Observable<Device[]>((observer) => {
      setTimeout(() => {
        observer.next([
          {
            id: 1,
            connectionString: 'ocvmocvm2yu5inv34uy5vi8b3y4785vyn3487nc56y78346y',
          },
          {
            id: 2,
            connectionString: 'c34m80237c5n892347nc59827958c723n985cn7238973987',
          },
        ]);
      }, 1000);
    });
  }
}
