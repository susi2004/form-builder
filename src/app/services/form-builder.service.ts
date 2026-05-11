import { Injectable } from '@angular/core';
import { FormElement } from '../models/form-element.model';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  formElements: FormElement[] = [];

  addElement(type: string): void {
    const defaults: Record<string, { label: string; placeholder?: string }> = {
      text: { label: 'Text Input', placeholder: 'Enter text here' },
      textarea: { label: 'Text Area', placeholder: 'Enter your message' },
      email: { label: 'Email', placeholder: 'Enter your email' },
      checkbox: { label: 'Checkbox' },
      radio: { label: 'Radio Button' },
      dropdown: { label: 'Select Option' },
      button: { label: 'Button' },
    };
    const config = defaults[type] || { label: type };
    this.formElements.push({
      id: Date.now(),
      type,
      label: config.label,
      placeholder: config.placeholder,
      required: false,
      value: type === 'checkbox' ? false : '',
      options: type === 'dropdown' ? [{ label: 'Option 1', value: 'opt1' }, { label: 'Option 2', value: 'opt2' }] : [],
      bgColor: '#ffffff',
      textColor: '#333333',
      borderColor: '#cccccc',
      borderRadius: 5,
      padding: 8,
    });
  }

  removeElement(id: number): void {
    this.formElements = this.formElements.filter((el) => el.id !== id);
  }

  clearAll(): void {
    this.formElements = [];
  }
}
