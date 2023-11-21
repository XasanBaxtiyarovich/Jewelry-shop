import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../entities/category.entity";

export class CreateCategoryDto {
    @ApiProperty({ example: 'category_name', description: 'Jewelry category name'})
    @IsString()
    category_name: string;

    @ApiProperty({ example: 'parent_id', description: 'Jewelry parent primary key id'})
    @IsString()   
    parent: Category
}