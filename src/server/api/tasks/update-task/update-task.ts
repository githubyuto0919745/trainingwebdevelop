import z from 'zod';
import { authenticatedProcedure } from '../../trpc';
import { rethrowKnownPrismaError } from '@fhss-web-team/backend-utils';
import { prisma, Status } from '../../../../../prisma/server';

const updateTaskInput = z.object({
  taskId: z.string(),
  newTitle: z.optional(z.string()),
  newDescription: z.optional(z.string()),
  newStatus: z.optional(z.literal(Object.values(Status))),
});

const updateTaskOutput = z.object({
  status: z.literal(Object.values(Status)),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completedDate: z.nullable(z.date()),
});

export const updateTask = authenticatedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(updateTaskInput)
  .output(updateTaskOutput)
  .mutation(async opts => {
    try {
      const oldTask = await prisma.task.findUniqueOrThrow({
        where: { id: opts.input.taskId, userId: opts.ctx.userId },
      });

      //calculate completedAt date based on status changes
      let calculatedCompletedAt: Date | null = oldTask.completedDate;
      if (opts.input.newStatus) {
        if (opts.input.newStatus != oldTask.status) {
          //if we just switched the task to complete
          if (opts.input.newStatus === 'Complete') {
            calculatedCompletedAt = new Date();
          }
          //if we just switched the task off complete
          else if (oldTask.status === 'Complete') {
            calculatedCompletedAt = null;
          }
        }
      }

      return await prisma.task.update({
        where: {
          id: oldTask.id,
          userId: opts.ctx.userId,
        },
        data: {
          title: opts.input.newTitle?.trim(),
          description: opts.input.newDescription,
          status: opts.input.newStatus,
          completedDate: calculatedCompletedAt,
        },
      });
    } catch (error) {
      rethrowKnownPrismaError(error);
      throw error;
    }
  });
