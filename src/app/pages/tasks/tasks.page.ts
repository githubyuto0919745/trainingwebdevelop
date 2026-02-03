import { Component, inject, signal, viewChild } from '@angular/core';
import { TRPC_CLIENT } from '../../utils/trpc.client';
import { trpcResource } from '@fhss-web-team/frontend-utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TaskCardComponent } from './task-card/task-card.component';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from './new-task/new-task.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  imports: [MatProgressSpinnerModule, MatPaginator, TaskCardComponent, MatIcon],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  private readonly trpc = inject(TRPC_CLIENT);
  protected readonly pageSize = 12;
  private readonly pageOffset = signal(0);
  private readonly dialog = inject(MatDialog);

  protected handlePageEvent(e: PageEvent) {
    this.pageOffset.set(e.pageIndex * e.pageSize);
  }
  protected readonly paginator = viewChild.required(MatPaginator);

  protected async deleteTask() {
    await this.taskResource.refresh();
    if (
      this.pageOffset() != 0 &&
      this.taskResource.value()?.data.length === 0
    ) {
      this.paginator().previousPage();
    }
  }

  protected openCreateDialog() {
    this.dialog
      .open(NewTaskComponent)
      .afterClosed()
      .subscribe(isSaved => {
        if (isSaved) {
          this.taskResource.refresh();
        }
      });
  }

  protected readonly taskResource = trpcResource(
    this.trpc.tasks.getTasksByUser.mutate,
    () => {
      return {
        pageOffset: this.pageOffset(),
        pageSize: this.pageSize,
      };
    },
    { autoRefresh: true }
  );
}
