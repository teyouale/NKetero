import { createId } from '@paralleldrive/cuid2';
import { createZodDto } from 'nestjs-zod/dto';
import { idSchema, userSchema, usernameSchema } from '../user';
import { z } from 'zod';

export const createUserReservationSchema = z.object({
  businessId: z.string(),
  service: z.string(),
  date: z.date(),
  status: z
    .enum(['PENDING', 'CONFIRMED', 'CANCELLED'])
    .optional()
    .default('PENDING'),
  name: z.string().min(1).max(255),
  username: usernameSchema,
  email: z.string().email(),
  phoneNumber: z.string().min(1).max(20),
});

export class CreateUserReservationDto extends createZodDto(
  createUserReservationSchema
) {}
