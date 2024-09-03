import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

import { userSchema } from '../user';
import { businessSchema } from '../profile';

export const registerSchema = userSchema
  .partial()
  .pick({
    email: true,
    role: true,
    name: true,
    username: true,
    phoneNumber: true,
  })
  .extend({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    business: businessSchema.partial().pick({ location: true }).optional(),
  });

export class RegisterDto extends createZodDto(registerSchema) {}
