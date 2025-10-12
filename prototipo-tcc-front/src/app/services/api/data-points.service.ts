import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataPoint } from '../../models/data-point';

@Injectable({
  providedIn: 'root'
})
export class DataPointsService {

  private readonly apiUrl = 'http://localhost:3000/data_point';
  readonly httpClient = inject(HttpClient);

  async StoreDataPoint(point: DataPoint) {
    await this.httpClient.post(`${this.apiUrl}`, point).toPromise();
  }

  async GetDataPoints(): Promise<DataPoint[]> {
    return await this.httpClient.get<DataPoint[]>(`${this.apiUrl}`).toPromise() ?? [];
  }

  async Save(point: DataPoint) {
    this.StoreDataPoint(point); 
  }

  async Remove(index: number) {
    await this.httpClient.delete(`${this.apiUrl}/${index}`).toPromise();
  }

  // async Analyze() {
  //   const points = this.GetDataPoints();

  //   return await this.httpClient.post(
  //     'http://localhost:8000/gerar_grafico',
  //     {
  //       data: points.map(p => p.date.toString()),
  //       valor_x: points.map(p => p.valueX),
  //       valor_y: points.map(p => p.valueY),
  //     },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //       responseType: 'text'
  //     }).toPromise();
  // }
}
