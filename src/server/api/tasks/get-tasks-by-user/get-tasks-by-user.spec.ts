import { generateFakeUserData } from '@fhss-web-team/backend-utils';
import { appRouter } from '../../api.routes';
import { describe, beforeAll, afterAll } from 'vitest';
import { prisma, User } from '../../../../../prisma/server';

describe('Get tasks by user', () => {
  let requestingUser: User;
  let getTasksByUser: ReturnType<
    typeof appRouter.createCaller
  >['tasks']['getTasksByUser'];

  beforeAll(async () => {
    requestingUser = await prisma.user.create({
      data: generateFakeUserData({
        permissions: [],
      }),
    });
    getTasksByUser = appRouter
      .createCaller({ userId: requestingUser.id })
      .tasks
      .getTasksByUser;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: requestingUser.id } });
  });
});