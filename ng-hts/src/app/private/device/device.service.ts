import { Injectable } from '@angular/core';
import {
  CreateDevice,
  Device,
  DeviceDetail,
  ListDevice,
  UpdateDevice,
} from './models/device.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  public listDevices(): Observable<ListDevice[]> {
    return this.httpClient.get<ListDevice[]>(
      `${environment.deviceApiBaseUrl}/device`
    );
  }

  public createDevice(device: CreateDevice): Observable<Device> {
    return this.httpClient.post<Device>(
      `${environment.deviceApiBaseUrl}/device`,
      device
    );
  }

  public deleteDevice(deviceId: number | string): Observable<Device> {
    return this.httpClient.delete<Device>(
      `${environment.deviceApiBaseUrl}/device/${deviceId}`
    );
  }

  public getDevice(id: string, begin: string): Observable<DeviceDetail> {
    return this.httpClient.get<DeviceDetail>(
      `${environment.deviceApiBaseUrl}/device/${id}`,
      {
        params: {
          begin: begin,
        },
      }
    );
  }
}
