import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

export const authPayloadSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    username: z.string(),
    locale: z.string(),
  }),
});

export class AuthPayloadDto extends createZodDto(authPayloadSchema) {}
