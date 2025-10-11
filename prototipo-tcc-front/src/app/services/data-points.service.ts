import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface DataPoint {
  date: Date;
  valueX: number | string;
  valueY: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class DataPointsService {

  readonly httpClient = inject(HttpClient);

  constructor() {
    const initialized = localStorage.getItem('initialized') ?? false;
    if (!initialized) {
      localStorage.setItem('dataPoints', JSON.stringify([]));
      localStorage.setItem('initialized', 'true');
    }
  }

  StoreDataPoint(point: DataPoint) {
    const dataPoints: DataPoint[] = JSON.parse(localStorage.getItem('dataPoints') || '[]');
    dataPoints.push(point);
    localStorage.setItem('dataPoints', JSON.stringify(dataPoints));
  }

  GetDataPoints(): DataPoint[] {
    return JSON.parse(localStorage.getItem('dataPoints') || '[]');
  }

  Save(point: DataPoint) {
    this.StoreDataPoint(point);
  }

  Remove(index: number) {
    const dataPoints: DataPoint[] = JSON.parse(localStorage.getItem('dataPoints') || '[]');
    dataPoints.splice(index, 1);
    localStorage.setItem('dataPoints', JSON.stringify(dataPoints));
  }

  async Analyze() {
    const points = this.GetDataPoints();

    return await this.httpClient.post(
      'http://localhost:8000/gerar_grafico',
      {
        data: points.map(p => p.date.toString()),
        valor_x: points.map(p => p.valueX),
        valor_y: points.map(p => p.valueY),
      },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      }).toPromise();
  }
}
