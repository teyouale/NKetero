import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

export const businessSubcategorySchema = z.object({
    id: z.number().int().nonnegative().optional(), // ID is optional for creation
    businessId: z.string(), // Assuming businessId is a string
    subcategoryId: z.number().int().nonnegative(),
    price: z.number().nonnegative(),
});

// Create DTO classes using the schemas
export class CreateBusinessSubcategoryDto extends createZodDto(businessSubcategorySchema.omit({ id: true })) { }
export class UpdateBusinessSubcategoryDto extends createZodDto(businessSubcategorySchema.partial()) { }
export class BusinessSubcategoryDto extends createZodDto(businessSubcategorySchema) { }

export const batchBusinessSubcategorySchema = z.object({
    businessSubcategories: z.array(businessSubcategorySchema.omit({ id: true })),
});

export class BatchCreateBusinessSubcategoryDto extends createZodDto(batchBusinessSubcategorySchema) { }

export const updateBusinessSubcategorySchema = businessSubcategorySchema.partial();
export const updateBusinessSubcategoriesSchema = z.object({
    businessSubcategories: z.array(updateBusinessSubcategorySchema),
});
export class UpdateBusinessSubcategoriesDto extends createZodDto(updateBusinessSubcategoriesSchema) { }