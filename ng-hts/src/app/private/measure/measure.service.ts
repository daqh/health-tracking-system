import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Measure } from './models/measure.model';

@Injectable()
export class MeasureService {
  constructor(private httpClient: HttpClient) {}

  listMeasures() {
    return this.httpClient.get<Measure>(`${environment.deviceApiBaseUrl}/measure`);
  }
}
