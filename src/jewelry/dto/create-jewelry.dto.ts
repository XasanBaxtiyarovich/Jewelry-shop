import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { Sample } from "../../samples/entities/sample.entity";
import { Category } from "../../categories/entities/category.entity";

export class CreateJewelryDto {
    @ApiProperty({example: 'country', description: 'Jewelry country'})
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({example: 'brand', description: 'Jewelry brand'})
    @IsNotEmpty()
    @IsString()
    brand: string;

    @ApiProperty({example: 'price', description: 'Jewelry price'})
    @IsNotEmpty()
    price: number;

    @ApiProperty({example: 'category_id', description: 'Category primary key ID'})
    category_id: Category;

    @ApiProperty({example: 'sample_id', description: 'Sample primary key ID'})
    sample_id: Sample;
}
