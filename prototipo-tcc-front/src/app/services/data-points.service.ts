import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface DataPoint {
  type: "x" | "y"; 
  date: Date;
  value: number;
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
    const pointsByDate: { date: string, x: number; y: number }[] = [];

    const points = this.GetDataPoints();

    console.log(points);

    points.forEach(point => {
      const dateStr = point.date.toString();
      let date = pointsByDate.find(d => d.date.toString() === dateStr);
      if (!date) {
        const newDate = { date: dateStr, x: 0, y: 0 };
        pointsByDate.push(newDate);
        date = newDate;
      }
      
      if (point.type === 'x') {
        date.x += point.value;
      } else if (point.type === 'y') {
        date.y += point.value;
      }
    });

    return await this.httpClient.post(
      'http://localhost:8000/gerar_grafico',
      {
        data: pointsByDate.map(p => p.date),
        valor_x: pointsByDate.map(p => p.x === 0 ? "NA" : p.x),
        valor_y: pointsByDate.map(p => p.y === 0 ? "NA" : p.y)
      },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      }).toPromise();
  }
}
