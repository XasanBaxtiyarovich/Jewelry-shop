import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus, Put } from '@nestjs/common';

import { AdminGuard, UserGuard } from '../guards';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@ApiTags('category')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({summary: 'Create new category'})
  @ApiResponse({status: 201, type: Category})
  @UseGuards(AdminGuard)
  @Post('create')
  createCATEGORY(@Body() createCategoryDto: CreateCategoryDto): Promise<Category | HttpStatus> {
    return this.categoriesService.createCATEGORY(createCategoryDto);
  }

  @ApiOperation({summary: 'Find all categories'})
  @ApiResponse({status: 201, type: [Category]})
  @Get('find-all')
  findAllCATEGORIES(): Promise<Category[] | HttpStatus> {
    return this.categoriesService.findAllCATEGORIES();
  }

  @ApiOperation({summary: 'Find one category'})
  @ApiResponse({status: 201, type: Category})
  @Get('find-one/:id')
  findOneCATEGORY(@Param('id') id: string): Promise<Category | HttpStatus> {
    return this.categoriesService.findOneCATEGORY(+id);
  }

  @ApiOperation({summary: 'Update one category'})
  @ApiResponse({status: 201, type: Category})
  @UseGuards(AdminGuard)
  @Put('update-one/:id')
  updateCATEGORY(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category | HttpStatus> {
    return this.categoriesService.updateCATEGORY(+id, updateCategoryDto);
  }

  @ApiOperation({summary: 'Remove one category'})
  @ApiResponse({status: 201, type: Boolean})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeCATEGORY(@Param('id') id: string): Promise<Boolean | HttpStatus> {
    return this.categoriesService.removeCATEGORY(+id);
  }
}