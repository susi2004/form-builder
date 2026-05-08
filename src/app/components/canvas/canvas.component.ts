import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormElement } from '../../models/form-element.model';
import { CodeExportModalComponent } from '../code-export-modal/code-export-modal.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDropList, CodeExportModalComponent],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  editingElement: number | null = null;
  newOptionLabel: Record<number, string> = {};
  showCodeModal = false;
  generatedCode = '';

  constructor(public formService: FormBuilderService) {}

  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer !== event.container) {
      const droppedType: string = event.item.data;
      this.formService.addElement(droppedType);
    }
  }

  toggleEditing(elementId: number): void {
    this.editingElement = this.editingElement === elementId ? null : elementId;
  }

  stopEditing(): void {
    this.editingElement = null;
  }

  deleteElement(id: number): void {
    this.formService.removeElement(id);
  }

  clearAll(): void {
    this.formService.clearAll();
  }

  addOption(element: FormElement): void {
    if (!element.options) element.options = [];
    const newOption = {
      label: this.newOptionLabel[element.id] || 'New Option',
      value: `opt${element.options.length + 1}`,
    };
    element.options.push(newOption);
    this.newOptionLabel[element.id] = '';
  }

  removeOption(element: FormElement, index: number): void {
    if (element.options) {
      element.options.splice(index, 1);
    }
  }

  getElementStyle(element: FormElement): any {
    return {
      'background-color': element.bgColor || '#ffffff',
      color: element.textColor || '#333333',
      'border-color': element.borderColor || '#cccccc',
      'border-radius': (element.borderRadius || 5) + 'px',
      padding: (element.padding || 8) + 'px',
    };
  }

  private buildInlineStyle(el: FormElement): string {
    const styles: string[] = [];
    if (el.bgColor && el.bgColor !== '#ffffff') styles.push(`background-color: ${el.bgColor}`);
    if (el.textColor && el.textColor !== '#333333') styles.push(`color: ${el.textColor}`);
    if (el.borderColor && el.borderColor !== '#cccccc') styles.push(`border: 1px solid ${el.borderColor}`);
    if (el.borderRadius && el.borderRadius !== 5) styles.push(`border-radius: ${el.borderRadius}px`);
    if (el.padding && el.padding !== 8) styles.push(`padding: ${el.padding}px`);
    return styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
  }

  exportCode(): void {
    let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
    html += '  <meta charset="UTF-8">\n';
    html += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += '  <title>Generated Form</title>\n';
    html += '  <style>\n';

    // Generate CSS
    html += `    * { margin: 0; padding: 0; box-sizing: border-box; }\n`;
    html += `    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; padding: 20px; }\n`;
    html += `    .form-container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }\n`;
    html += `    .form-container h1 { margin-bottom: 30px; color: #333; font-size: 24px; }\n`;
    html += `    .form-group { margin-bottom: 20px; }\n`;
    html += `    label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; }\n`;
    html += `    input[type="text"], input[type="email"], textarea, select { width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; font-family: inherit; transition: border-color 0.2s; }\n`;
    html += `    input[type="text"]:focus, input[type="email"]:focus, textarea:focus, select:focus { outline: none; border-color: #4a90e2; box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1); }\n`;
    html += `    textarea { resize: vertical; min-height: 100px; }\n`;
    html += `    .checkbox-group, .radio-group { display: flex; align-items: center; margin: 10px 0; }\n`;
    html += `    input[type="checkbox"], input[type="radio"] { margin-right: 8px; cursor: pointer; }\n`;
    html += `    .required::after { content: ' *'; color: #dc3545; }\n`;
    html += `    button[type="submit"] { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 20px; }\n`;
    html += `    button[type="submit"]:hover { background: #0056b3; }\n`;

    html += '  </style>\n';
    html += '</head>\n<body>\n';
    html += '  <div class="form-container">\n';
    html += '    <h1>Form</h1>\n';
    html += '    <form>\n';

    // Generate HTML form fields
    this.formService.formElements.forEach((el) => {
      const styleAttr = this.buildInlineStyle(el);
      const requiredAttr = el.required ? ' required' : '';
      const requiredClass = el.required ? ' required' : '';

      if (el.type === 'text' || el.type === 'email') {
        html += `      <div class="form-group">\n`;
        html += `        <label${requiredClass}>${el.label}</label>\n`;
        html += `        <input type="${el.type}" placeholder="${el.placeholder || 'Enter ' + el.label}"${requiredAttr}${styleAttr}>\n`;
        html += `      </div>\n`;
      } else if (el.type === 'textarea') {
        html += `      <div class="form-group">\n`;
        html += `        <label${requiredClass}>${el.label}</label>\n`;
        html += `        <textarea placeholder="${el.placeholder || 'Enter your message'}"${requiredAttr}${styleAttr}></textarea>\n`;
        html += `      </div>\n`;
      } else if (el.type === 'checkbox') {
        html += `      <div class="form-group checkbox-group">\n`;
        html += `        <input type="checkbox"${requiredAttr}>
`;
        html += `        <label style="margin-bottom: 0;">${el.label}</label>\n`;
        html += `      </div>\n`;
      } else if (el.type === 'radio') {
        html += `      <div class="form-group radio-group">\n`;
        html += `        <input type="radio" name="radio-${el.id}"${requiredAttr}>
`;
        html += `        <label style="margin-bottom: 0;">${el.label}</label>\n`;
        html += `      </div>\n`;
      } else if (el.type === 'dropdown') {
        html += `      <div class="form-group">\n`;
        html += `        <label${requiredClass}>${el.label}</label>\n`;
        html += `        <select${requiredAttr}${styleAttr}>\n`;
        html += `          <option value="">-- Select --</option>\n`;
        el.options?.forEach((opt) => {
          html += `          <option value="${opt.value}">${opt.label}</option>\n`;
        });
        html += `        </select>\n`;
        html += `      </div>\n`;
      } else if (el.type === 'button') {
        html += `      <button type="submit"${styleAttr}>${el.label}</button>\n`;
      }
    });

    html += '    </form>\n';
    html += '  </div>\n';
    html += '</body>\n</html>';

    this.generatedCode = html;
    this.showCodeModal = true;
  }
}