import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataPoint, DataPointsService } from '../../services/data-points.service';

@Component({
  selector: 'app-grid',
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  readonly dataPointsService = inject(DataPointsService);
  dataPoints: DataPoint[] = []; 

  constructor() {
    this.dataPoints = this.dataPointsService.GetDataPoints();
  }

  remove(index: number) {
    this.dataPointsService.Remove(index);
    this.dataPoints = this.dataPointsService.GetDataPoints(); // Atualiza a lista após remoção
  }
}
