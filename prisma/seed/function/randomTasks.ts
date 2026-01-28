import { Prisma, prisma, Status } from '../../server';
import { faker } from '@faker-js/faker';

export async function randomTasks(count: number) {
  const tasks: Prisma.TaskCreateManyInput[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push({
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
      status: faker.helpers.arrayElement(Object.values(Status)),
      userId: 'user',
    });
  }

  await prisma.task.createMany({
    data: tasks,
  });
}
