import { idSchema, roleSchema } from '@ketero/dto';
import { z } from 'nestjs-zod/z';

export const payloadSchema = z.object({
  id: idSchema,
  role: roleSchema,
  isTwoFactorAuth: z.boolean().optional(),
});

export type Payload = z.infer<typeof payloadSchema>;
