import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { userSchema } from '../user';

export const businessSchema = z.object({
  id: z.string().cuid2().optional(),
  name: z.string(),
  description: z.string().optional(),
  workingHours: z.array(z.string()),
  location: z.string().url({
    message: 'Invalid Location format',
  }),
  user: userSchema,
});

export class BusinessDto extends createZodDto(businessSchema) {}
export class UpdateBusinessDto extends createZodDto(
  businessSchema.partial()
  // .pick({
  //   name: true,
  //   description: true,
  //   workingHours: true,
  //   location: true,
  //   id: true,
  // })
) {}
