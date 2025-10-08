import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements AfterViewInit {
  httpClient = inject(HttpClient);
  htmlContent: string = '';

  @ViewChild('plotIframe') plotIframe!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    if (this.htmlContent) {
      this.updateIframe();
    }
  }

  constructor() {
    this.fetchHtmlContent();
  }

  

  fetchHtmlContent() {
    const x = {
      data: "2025-02-25",
      valor: 10
    };

    const y = {
      data: "2025-02-25",
      valor: 5
    };


    this.httpClient.post(
      'http://localhost:8000/gerar_grafico',
      {
        data: ["2025-02-25", "2025-02-25", "2025-02-26"],
        valor_x: [10, 20, 15],
        valor_y: [5, 10, 8]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      })
      .subscribe(
        (response) => {
          this.htmlContent = response;
          this.updateIframe();
        },
        (error) => {
          console.error('Erro ao buscar conteúdo HTML:', error);
        }
      );
  }

  // deve ter um jeito mais simples de fazer isso
  updateIframe() {
    if (this.plotIframe && this.plotIframe.nativeElement) {
      const iframe = this.plotIframe.nativeElement;
      iframe.srcdoc = this.htmlContent;
    }
  }
}
