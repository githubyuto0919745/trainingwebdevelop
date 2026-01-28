import { updateTask } from './tasks/update-task/update-task';
import { deleteTask } from './tasks/delete-task/delete-task';
import { createTask } from './tasks/create-task/create-task';
import { getTasksByUser2 } from './tasks/get-tasks-by-user2/get-tasks-by-user2';
import { getTasksByUser } from './tasks/get-tasks-by-user/get-tasks-by-user';
import { router } from './trpc';

export const appRouter = router({
  tasks: {
    updateTask,
    deleteTask,
    createTask,
    getTasksByUser2,
    getTasksByUser,
  },});
