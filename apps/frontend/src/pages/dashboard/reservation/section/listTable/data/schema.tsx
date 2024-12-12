import { z } from 'zod';

const locationSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

export const businessSchema = z.object({
  activeReservationsCount: z.number().min(0),
  businessId: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  location: locationSchema,
  name: z.string().min(1),
  ownerName: z.string().min(1),
  pendingReservationsCount: z.number().min(0),
  phoneNumber: z.string().min(1),
  workingHours: z.array(z.string()),
});
