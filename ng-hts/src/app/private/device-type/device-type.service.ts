import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DeviceType } from './models/device-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  constructor(private httpClient: HttpClient) {}

  public listDeviceTypes(): Observable<DeviceType[]> {
    return this.httpClient.get<DeviceType[]>(
      `${environment.apiBaseUrl}/device-type`
    );
  }

  public createDeviceType(deviceType: DeviceType): Observable<DeviceType> {
    return this.httpClient.post<DeviceType>(
      `${environment.apiBaseUrl}/device-type`,
      deviceType
    );
  }
}
