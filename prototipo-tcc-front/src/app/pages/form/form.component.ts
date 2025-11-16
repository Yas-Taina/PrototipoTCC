import { Component, inject } from '@angular/core';
import { DataPointsService } from '../../services/api/data-points.service';
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
    value_x: [null, [Validators.min(0)]],
    value_y: [null, [Validators.min(0)]],
  });

  constructor() { }

  async onSubmit(point: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.dataPointsService.Save(point);
      alert("Dados registrados com sucesso");
    }
    catch (error) {
      alert(`Erro ao salvar ponto de dados: ${error}`);
    }    
  }
}
