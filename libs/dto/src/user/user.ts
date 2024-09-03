import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { secretsSchema } from '../secrets';
import { roleSchema } from './role';
import { businessSchema } from '../profile';

export const PhoneNumberSchema = z.string().min(5).max(15);

export const idSchema = z
  .string()
  .cuid2()
  .default(createId())
  .describe('Unique identifier for the item in Cuid2 format');

export const usernameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[\d._a-z-]+$/, {
    message:
      'Usernames can only contain lowercase letters, numbers, periods, hyphens, and underscores.',
  });

export const userSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(255),
  username: usernameSchema,
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  phoneNumber: z.string().min(1).max(20),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: roleSchema,
});

export class UserDto extends createZodDto(userSchema) {}

export const userWithSecretsSchema = userSchema.merge(
  z.object({ secrets: secretsSchema })
);
export class UserWithSecrets extends createZodDto(userWithSecretsSchema) {}
