import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { userSchema } from './user';

const businessSchema = z.object({
  id: z.string().cuid2().optional(),
  name: z.string(),
  description: z.string().optional(),
  workingHours: z.array(z.string()),
  location: z.string().url({
    message: 'Invalid Location format',
  }),
  user: userSchema,
});

export const createBusinessUserSchema = businessSchema
  .partial()
  .pick({
    location: true,
  })
  .extend({
    user: userSchema.partial().pick({
      email: true,
      name: true,
      username: true,
      phoneNumber: true,
    }),
  });

export class CreateBusinessUserDto extends createZodDto(
  createBusinessUserSchema
) { }
