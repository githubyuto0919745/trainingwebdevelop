import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma, Status } from '../../../../../prisma/server';

const getTasksByUserInput = z.object({
  pageSize: z.number(),
  pageOffset: z.number(),
});

const getTasksByUserOutput = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      status: z.enum(Status),
      completedDate: z.date().nullable(),
    })
  ),
  totalCount: z.number(),
});

export const getTasksByUser = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(getTasksByUserInput)
  .output(getTasksByUserOutput)
  .mutation(async opts => {
    // count the total number of tasks
    const total = await prisma.task.count({
      where: {
        userId: opts.ctx.userId,
      },
    });

    // retrieve all tasks for this user on this page
    const tasks = await prisma.task.findMany({
      where: {
        userId: opts.ctx.userId,
      },
      orderBy: { createdAt: 'desc' },
      take: opts.input.pageSize,
      skip: opts.input.pageOffset,
    });

    return {
      totalCount: total,
      data: tasks,
    };
  });
