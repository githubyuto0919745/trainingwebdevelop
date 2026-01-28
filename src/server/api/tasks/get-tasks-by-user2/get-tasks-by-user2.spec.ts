import { generateFakeUserData } from '@fhss-web-team/backend-utils';
import { appRouter } from '../../api.routes';
import { describe, beforeAll, afterAll } from 'vitest';
import { prisma, User } from '../../../../../prisma/server';

describe('Get tasks by user2', () => {
  let requestingUser: User;
  let getTasksByUser2: ReturnType<
    typeof appRouter.createCaller
  >['tasks']['getTasksByUser2'];

  beforeAll(async () => {
    requestingUser = await prisma.user.create({
      data: generateFakeUserData({
        permissions: [],
      }),
    });
    getTasksByUser2 = appRouter
      .createCaller({ userId: requestingUser.id })
      .tasks
      .getTasksByUser2;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: requestingUser.id } });
  });
});