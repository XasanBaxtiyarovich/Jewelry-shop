import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto'

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoriesRepo: Repository<Category>) {}

  async createCATEGORY(createCategoryDto: CreateCategoryDto): Promise<Category | HttpStatus> {
    const category = await this.categoriesRepo.findOne(
      {
        where: {category_name: createCategoryDto.category_name}
      }
    )
    if(category) return HttpStatus.CONFLICT;

    return this.categoriesRepo.save({...createCategoryDto});
  }

  async findAllCATEGORIES(): Promise<Category[] | HttpStatus> {
    const categories = await this.categoriesRepo.find({ relations: ['parent'] });

    if(categories.length === 0) return HttpStatus.NOT_FOUND;

    return categories;
  }

  async findOneCATEGORY(id: number): Promise<Category | HttpStatus> {
    const category = await this.categoriesRepo.findOne({where: {id}, relations: ['parent']});

    if (!category) return HttpStatus.NOT_FOUND;

    return category;
  }

  async updateCATEGORY(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category | HttpStatus> {
    const [category] = await this.categoriesRepo.findBy({id});
    if (!category) return HttpStatus.NOT_FOUND;

    const categoryNameConflict = await this.categoriesRepo.findOne({ where: {category_name: updateCategoryDto.category_name} });
    if(categoryNameConflict) return HttpStatus.CONFLICT;

    await this.categoriesRepo.update({id}, {category_name: updateCategoryDto.category_name });

    const updateCategory = await this.categoriesRepo.findOne({ where: {category_name: updateCategoryDto.category_name} });
    return updateCategory;
  }

  async removeCATEGORY(id: number): Promise<Boolean | HttpStatus> {
    const [category] = await this.categoriesRepo.findBy({id});

    if (!category) return HttpStatus.NOT_FOUND;

    await this.categoriesRepo.delete({id});
    return true;
  }
}