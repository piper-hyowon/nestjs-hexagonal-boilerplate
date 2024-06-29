import { PrismaClient } from '@prisma/client';
import { ContentNotFoundError } from './common/types/error/application-exceptions';

export const prisma = new PrismaClient({
//   rejectOnNotFound: {
//     findFirst: {
//       user: (err) => new ContentNotFoundError('user', err),
//     },
//   },
});
