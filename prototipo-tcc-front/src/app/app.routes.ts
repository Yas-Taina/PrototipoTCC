import { Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { GridComponent } from './pages/grid/grid.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';

export const routes: Routes = [
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'analyze',
    component: AnalyzeComponent
  },
  { path: '', redirectTo: '/grid', pathMatch: 'full' },
];
