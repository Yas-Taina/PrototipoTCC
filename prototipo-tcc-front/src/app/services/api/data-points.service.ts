import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataPoint } from '../../models/data-point';

@Injectable({
  providedIn: 'root'
})
export class DataPointsService {

  private readonly apiUrl = 'http://localhost:3000';
  readonly httpClient = inject(HttpClient);

  async StoreDataPoint(point: DataPoint) {
    await this.httpClient.post(`${this.apiUrl}/data_point`, point).toPromise();
  }

  async GetDataPoints(): Promise<DataPoint[]> {
    return await this.httpClient.get<DataPoint[]>(`${this.apiUrl}/data_point`).toPromise() ?? [];
  }

  async Save(point: DataPoint) {
    this.StoreDataPoint(point);
  }

  async Remove(index: number) {
    await this.httpClient.delete(`${this.apiUrl}/data_point/${index}`).toPromise();
  }

  async Analyze() {
    return await this.httpClient.get(
      `${this.apiUrl}/analysis/execute`,
      { responseType: 'text' }
    ).toPromise();
  }
}
