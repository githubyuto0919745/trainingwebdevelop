import { Component, inject, signal, viewChild } from '@angular/core';
import { TRPC_CLIENT } from '../../utils/trpc.client';
import { trpcResource } from '@fhss-web-team/frontend-utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TasksCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-tasks',
  imports: [MatProgressSpinnerModule, MatPaginator, TasksCardComponent],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  private readonly trpc = inject(TRPC_CLIENT);
  protected readonly pageSize = 12;
  private readonly pageOffset = signal(0);

  protected handlePageEvent(e: PageEvent) {
    this.pageOffset.set(e.pageIndex * e.pageSize);
  }

  protected readonly paginator = viewChild.required(MatPaginator);
  protected async taskDeleted() {
    await this.taskResource.refresh();
    if (
      this.pageOffset() != 0 &&
      this.taskResource.value()?.data.length === 0
    ) {
      this.paginator().previousPage();
    }
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
