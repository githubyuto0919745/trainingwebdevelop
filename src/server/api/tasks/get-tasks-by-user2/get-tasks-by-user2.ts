import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';

const getTasksByUser2Input = z.null();

const getTasksByUser2Output = z.void();

export const getTasksByUser2 = authorizedProcedure
  .meta({ requiredPermissions: [] })
  .input(getTasksByUser2Input)
  .output(getTasksByUser2Output)
  .mutation(() => {
    // Your logic goes here
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' });
  });
