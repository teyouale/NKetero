import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async getAllSubcategories(categoryId: number) {
    return this.prisma.subcategory.findMany({
      where: { categoryId },
    });
  }

  async getAllSubcategoriesWithCategories() {
    return await this.prisma.subcategory.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
