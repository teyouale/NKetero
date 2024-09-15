import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto, SubcategoryDto } from '@ketero/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get('main')
  async getMainCategories() {
    return await this.categoriesService.getAllCategories();
  }
  @Get()
  async getAllSubcategoriesWithCategories() {
    return await this.categoriesService.getAllSubcategoriesWithCategories();
  }
  @Get(':id/subcategories')
  async getAllSubcategories(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SubcategoryDto[]> {
    return this.categoriesService.getAllSubcategories(id);
  }
}
