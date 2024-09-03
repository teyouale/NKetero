// src/business/dto/get-businesses.dto.ts
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

export const GetBusinessesReservationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  ownerName: z.string(),
  phoneNumber: z.string(),
  workingHours: z.array(z.string()),
  location: z.string(),
  description: z.string().optional(),
  businessId: z.string(),
  pendingReservationsCount: z.number(),
  activeReservationsCount: z.number(),
});

export class GetBusinessesReservationDto extends createZodDto(
  GetBusinessesReservationSchema
) {}
