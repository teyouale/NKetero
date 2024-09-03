import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
// Define the Category schema
export const categorySchema = z.object({
  id: z.number().int().nonnegative(), // Assuming ID is a positive integer
  name: z.string(),
  description: z.string().optional(),
});

// Define the Subcategory schema
export const subcategorySchema = z.object({
  id: z.number().int().nonnegative(), // Assuming ID is a positive integer
  name: z.string(),
  description: z.string().optional(),
  categoryId: z.number().int().nonnegative(), // Foreign key reference to Category
});

// Create DTO classes using the schemas
export class CategoryDto extends createZodDto(categorySchema) {}
export class SubcategoryDto extends createZodDto(subcategorySchema) {}
