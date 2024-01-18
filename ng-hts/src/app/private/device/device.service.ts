import { Injectable } from '@angular/core';
import { CreateDevice, Device, ListDevice, UpdateDevice } from './models/device.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  public listDevices(): Observable<ListDevice[]> {
    return this.httpClient.get<ListDevice[]>(`${environment.apiBaseUrl}/device`);
  }

  public createDevice(device: CreateDevice): Observable<Device> {
    return this.httpClient.post<Device>(
      `${environment.apiBaseUrl}/device`,
      device
    );
  }

  public updateDevice(device: UpdateDevice): Observable<Device> {
    return this.httpClient.put<Device>(
      `${environment.apiBaseUrl}/device/${device.id}`,
      device
    );
  }

  public deleteDevice(deviceId: number | string): Observable<Device> {
    return this.httpClient.delete<Device>(
      `${environment.apiBaseUrl}/device/${deviceId}`
    );
  }

  public getDevice(id: string): Observable<Device> {
    return this.httpClient.get<Device>(
      `${environment.apiBaseUrl}/device/${id}`
    );
  }
}
