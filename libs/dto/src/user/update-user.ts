import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { userSchema } from './user';

export const updateUserSchema = userSchema.partial().pick({
  role: true,
  name:true,
  username: true,
  email: true,
  phoneNumber: true
});


export class UpdateUserDto extends createZodDto(updateUserSchema) { }

