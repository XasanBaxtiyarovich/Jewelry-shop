import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from '../entities/category.entity';

export class UpdateCategoryDto {
    @ApiProperty({ example: 'category_name', description: 'Product category name'})
    @IsString()
    category_name: string;
}