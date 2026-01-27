import { prisma } from '../../server';

export async function seedDelete() {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
}
