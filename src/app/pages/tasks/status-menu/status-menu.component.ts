import { Component, model, output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { Status } from '../../../../../prisma/app';

@Component({
  selector: 'app-status-menu',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './status-menu.component.html',
  styleUrl: './status-menu.component.scss',
})
export class StatusMenuComponent {
  readonly taskStatus = model.required<Status>();
  readonly taskChanged = output();

  protected setStatus(newStatus: Status) {
    this.taskStatus.set(newStatus);
    this.taskChanged.emit();
  }
}
