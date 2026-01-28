import { defineOptions, SeedArguments } from './types';
import { seedDelete } from './function/delete';
import { createUsers } from './function/createUser';
import { createTasks } from './function/createTasks';
import { randomTasks } from './function/randomTasks';

export const options = defineOptions({
  tasks: {
    type: 'boolean',
    description: 'generate hardcoded tasks',
    short: 't',
  },
  random: {
    type: 'string',
    description: 'generate the given number of random tasks',
    short: 'r',
  },
});

export async function seed(args?: SeedArguments) {
  await seedDelete();
  await createUsers();
  if (args?.tasks) {
    await createTasks();
  }

  if (args?.random) {
    await randomTasks(parseInt(args.random));
  }
}
