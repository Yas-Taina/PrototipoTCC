import { Component, inject } from '@angular/core';
import { TestComponent } from "./pages/test/test.component";
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prototipo-tcc-front';

  readonly router = inject(Router);

  constructor() {
    
  }
}
