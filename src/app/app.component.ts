import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { CodeModalComponent } from './components/code-modal/code-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // for *ngIf, *ngFor
    CdkDropListGroup,    // drag-drop grouping
    SidebarComponent,
    CanvasComponent,
    CodeModalComponent, // ✅ REQUIRED so <app-code-modal> works
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}