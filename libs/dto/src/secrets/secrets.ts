import { createId } from '@paralleldrive/cuid2';
import { z } from 'nestjs-zod/z';

const idSchema = z
  .string()
  .cuid2()
  .default(createId())
  .describe('Unique identifier for the item in Cuid2 format');
export const secretsSchema = z.object({
  id: idSchema,
  password: z.string().nullable(),
  lastSignedIn: z.date().nullable(),
  verificationToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  resetToken: z.string().nullable(),
  userId: idSchema,
});
