import { prisma } from '../../server';

export async function createUsers() {
  await prisma.user.createMany({
    data: [
      {
        id: 'admin',
        roles: ['admin'],
        accountType: 'Employee',
        netId: 'admin',
        firstName: 'Admin',
        lastName: 'Smith',
        preferredFirstName: 'Admin',
        preferredLastName: 'Smith',
      },
      {
        id: 'user',
        roles: ['user'],
        accountType: 'Employee',
        netId: 'user',
        firstName: 'User',
        lastName: 'Smith',
        preferredFirstName: 'User',
        preferredLastName: 'Smith',
      },
    ],
  });
}
