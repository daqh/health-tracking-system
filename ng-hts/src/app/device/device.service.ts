import { Injectable } from '@angular/core';
import { Device } from './models/device.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  public listDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(`${environment.apiBaseUrl}/device`);
  }

  public createDevice(device: Device): Observable<Device> {
    return this.httpClient.post<Device>(
      `${environment.apiBaseUrl}/device`,
      device
    );
  }

  public updateDevice(device: Device): Observable<Device> {
    return this.httpClient.put<Device>(
      `${environment.apiBaseUrl}/device/${device.id}`,
      device
    );
  }

  public deleteDevice(device: Device): Observable<Device> {
    return this.httpClient.delete<Device>(
      `${environment.apiBaseUrl}/device/${device.id}`
    );
  }

  public getDevice(id: string): Observable<Device> {
    return this.httpClient.get<Device>(
      `${environment.apiBaseUrl}/device/${id}`
    );
  }
}
