import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shared-ui',
  templateUrl: './shared-ui.component.html',
  styleUrls: ['./shared-ui.component.css']
})
export class SharedUiComponent {
  @Input() loading: boolean = false;  
  @Input() successMessage!: { summary: string, detail: string } | null;
  @Input() errorMessage!: { summary: string, detail: string } | null;

  constructor(private messageService: MessageService) {}

  ngOnChanges() {
    if (this.successMessage) {
      this.messageService.add({
        severity: 'success',
        summary: this.successMessage.summary,
        detail: this.successMessage.detail,
        life: 2000 
      });
      this.clearMessages();
    }
    if (this.errorMessage) {
      this.messageService.add({
        severity: 'error',
        summary: this.errorMessage.summary,
        detail: this.errorMessage.detail,
        life: 2000 
      });
      this.clearMessages();
    }
  }
  clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }
    private showToast(severity: 'success' | 'error', summary: string, detail: string) {
      this.messageService.add({
        severity,
        summary,
        detail,
        life: 4000,  
        key: 'customToast', 
      });
    }
}