import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma } from '../../../../../prisma/server';

const createTaskInput = z.object({
  title: z.string(),
  description: z.string(),
});

const createTaskOutput = z.void();

export const createTask = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(createTaskInput)
  .output(createTaskOutput)
  .mutation(async opts => {
    await prisma.task.create({
      data: {
        title: opts.input.title,
        description: opts.input.description,
        status: 'Incomplete',
        userId: opts.ctx.userId,
      },
    });
  });
