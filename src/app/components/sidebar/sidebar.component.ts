import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  components = [
    { type: 'text', label: 'TextBox' },
    { type: 'textarea', label: 'TextArea' },
    { type: 'email', label: 'Email' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio Button' },
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'button', label: 'Button' },
  ];
}
