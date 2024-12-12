import { createId } from '@paralleldrive/cuid2';
import { createZodDto } from 'nestjs-zod/dto';
import { idSchema, userSchema, usernameSchema } from '../user';
import { z } from 'zod';

export const reservationSchema = z.object({
  id: idSchema,
  businessId: z.string(),
  clientId: z.string(),
  service: z.string(),
  date: z.date(),
  price: z.number(),
  status: z
    .enum(['PENDING', 'CONFIRMED', 'CANCELLED'])
    .optional()
    .default('PENDING'),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export class CreateReservationDto extends createZodDto(
  reservationSchema.pick({
    businessId: true,
    clientId: true,
    service: true,
    date: true,
    price: true
  })
) { }
export class ReservationDto extends createZodDto(reservationSchema) { }
export class UpdateReservationDto extends createZodDto(
  reservationSchema.partial()
) { }
