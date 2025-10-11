import { Component, inject } from '@angular/core';
import { DataPoint, DataPointsService } from '../../services/data-points.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  readonly dataPointsService = inject(DataPointsService);
  readonly builder = inject(FormBuilder);

  form = this.builder.group({
    date: [null, [Validators.required]],
    valueX: [null, [Validators.min(0)]],
    valueY: [null, [Validators.min(0)]],
  });

  constructor() { }

  onSubmit(point: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    if (!point.valueX) {
      point.valueX = 'NA';
    }
    
    if (!point.valueY) {
      point.valueY = 'NA';
    }

    this.dataPointsService.Save(point);

    alert("Dados registrados com sucesso");
  }
}
