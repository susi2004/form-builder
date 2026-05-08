import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-export-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-export-modal.component.html',
  styleUrls: ['./code-export-modal.component.css'],
})
export class CodeExportModalComponent {
  @Input() isOpen = false;
  @Input() generatedCode = '';
  @Output() close = new EventEmitter<void>();

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedCode).then(() => {
      alert('Code copied to clipboard!');
    });
  }

  downloadCode(): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(this.generatedCode));
    element.setAttribute('download', 'form.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
