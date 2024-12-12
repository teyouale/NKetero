import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { secretsSchema } from '../secrets';
import { roleSchema } from './role';
import { businessSchema } from '../profile';

// Phone Number Schema
export const PhoneNumberSchema = z.string().min(5).max(15);


// ID Schema
export const idSchema = z
  .string()
  .cuid2()
  .default(() => createId()) // Ensure default value is a function
  .describe('Unique identifier for the item in Cuid2 format');

// Username Schema
export const usernameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[\d._a-z-]+$/, {
    message:
      'Usernames can only contain lowercase letters, numbers, periods, hyphens, and underscores.',
  });

// Password Schema


// User Schema
export const userSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(255),
  username: usernameSchema,
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  phoneNumber: PhoneNumberSchema, // Use the defined PhoneNumberSchema
  createdAt: z.date(),
  updatedAt: z.date(),
  role: roleSchema,
});

// User DTO
export class UserDto extends createZodDto(userSchema) {}

// User with Secrets Schema
export const userWithSecretsSchema = userSchema.merge(
  z.object({ secrets: secretsSchema })
);

// User with Secrets DTO
export class UserWithSecrets extends createZodDto(userWithSecretsSchema) {}
