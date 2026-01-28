import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma, Status } from '../../../../../prisma/server';
import { rethrowKnownPrismaError } from '@fhss-web-team/backend-utils';

const updateTaskInput = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(Status),
  id: z.string(),
});

const updateTaskOutput = z.void();

export const updateTask = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(updateTaskInput)
  .output(updateTaskOutput)
  .mutation(async opts => {
    const { id, title, description, status } = opts.input;

    try {
      const oldTask = await prisma.task.findUniqueOrThrow({
        where: {
          id,
          userId: opts.ctx.userId,
        },
      });

      await prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          status,
          completedDate:
            status !== oldTask.status && status === 'Complete'
              ? new Date()
              : null,
        },
      });
    } catch (error) {
      rethrowKnownPrismaError(error);
      throw error;
    }
  });
