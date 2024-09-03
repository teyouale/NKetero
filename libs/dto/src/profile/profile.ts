import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export class CreateProfileDto extends createZodDto(profileSchema) {}
export class UpdateProfileDto extends createZodDto(profileSchema.partial()) {}
