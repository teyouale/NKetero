import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { userSchema } from '../user';

export const businessSchema = z.object({
  id: z.string().cuid2().optional(),
  name: z.string(),
  description: z.string().optional(),
  workingHours: z.array(z.string()),
  location: z.object({
    latitude: z.number().refine(val => !isNaN(val), {
      message: 'Latitude must be a number',
    }),
    longitude: z.number().refine(val => !isNaN(val), {
      message: 'Longitude must be a number',
    }),
  }).refine(data =>
    !isNaN(data.latitude) && !isNaN(data.longitude),
    {
      message: 'Location must be a valid object with latitude and longitude as numbers',
    },),
  user: userSchema,
});

export class BusinessDto extends createZodDto(businessSchema) { }
export class UpdateBusinessDto extends createZodDto(
  businessSchema.partial()
  // .pick({
  //   name: true,
  //   description: true,
  //   workingHours: true,
  //   location: true,
  //   id: true,
  // })
) { }
