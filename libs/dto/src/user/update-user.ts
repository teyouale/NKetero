import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { userSchema } from './user';

export const updateUserSchema = userSchema.partial().pick({
  role: true,
  username: true,
  email: true,
  name: true,
  phoneNumber: true,
});

export class UpdateUserDto extends createZodDto(updateUserSchema) { }
