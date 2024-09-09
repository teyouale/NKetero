import { z } from 'zod';

export const ReservationSchema = z.object({
  id: z.string(),
  ClientName: z.string(),
  Services: z.string(),
  Date: z.date(),
  price: z.number(),
  status: z.string(),
});
export type Reservation = z.infer<typeof ReservationSchema>;
