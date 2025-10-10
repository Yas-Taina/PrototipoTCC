import { Component, inject } from '@angular/core';
import { DataPointsService } from '../../services/data-points.service';
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
    type: ['x', [Validators.required]],
    date: [null, [Validators.required]],
    value: [0, [Validators.required, Validators.min(0)]]
  });

  constructor() { }

  onSubmit(data: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dataPointsService.Save(data);

    alert("Dados registrados com sucesso");
  }
}
