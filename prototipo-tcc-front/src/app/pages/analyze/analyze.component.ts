import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DataPointsService } from '../../services/data-points.service';

@Component({
  selector: 'app-analyze',
  imports: [],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})
export class AnalyzeComponent implements AfterViewInit {

  readonly dataPointsService = inject(DataPointsService);
  httpClient = inject(HttpClient);
  htmlContent: string = '';

  isLoading: boolean = false;

  @ViewChild('plotIframe') plotIframe!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    if (this.htmlContent) {
      this.updateIframe();
    }
  }

  constructor() { }

  async fetchHtmlContent() {
    this.isLoading = true;

    try {
      this.htmlContent = await this.dataPointsService.Analyze() ?? '';
      this.updateIframe();
    } catch (error) {
      console.error('Erro ao executar análise:', error);
    } finally {
      this.isLoading = false;
    }
  }

  updateIframe() {
    if (this.plotIframe && this.plotIframe.nativeElement) {
      const iframe = this.plotIframe.nativeElement;
      iframe.srcdoc = this.htmlContent;
    }
  }
}