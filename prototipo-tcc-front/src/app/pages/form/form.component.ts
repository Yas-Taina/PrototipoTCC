import { Component, inject } from '@angular/core';
import { DataPointsService } from '../../services/data-points.service';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  readonly dataPointsService = inject(DataPointsService);
  readonly builder = inject(FormBuilder);

  form = this.builder.group({
    type: ['x'],
    date: [new Date()],
    value: [0]
  });

  constructor() { }

  onSubmit(data: any) {
    this.dataPointsService.Save(data);
    console.log('Data submitted:', data);
  }

}
