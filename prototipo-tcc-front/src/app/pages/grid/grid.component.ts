import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataPointsService } from '../../services/api/data-points.service';
import { DataPoint } from '../../models/data-point';

@Component({
  selector: 'app-grid',
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  readonly dataPointsService = inject(DataPointsService);
  dataPoints: DataPoint[] = []; 

  async ngOnInit() {
    this.dataPoints = await this.dataPointsService.GetDataPoints();
  }

  async remove(index: number) {
    await this.dataPointsService.Remove(index);
    this.dataPoints = await this.dataPointsService.GetDataPoints();
  }
}
