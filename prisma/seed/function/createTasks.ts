import { prisma } from '../../server';

export async function createTasks() {
  await prisma.task.createMany({
    data: [
      {
        title: 'Seed Incomplete',
        description: 'This is an automatically seeded task.',
        Status: 'Incomplete',
        userId: 'user',
      },
      {
        title: 'Seed In Progress',
        description: 'This is an automatically seeded task.',
        Status: 'InProgress',
        userId: 'user',
      },
      {
        title: 'Seed Complete',
        description: 'This is an automatically seeded task.',
        Status: 'Complete',
        userId: 'user',
        completedDate: new Date(),
      },
    ],
  });
}
