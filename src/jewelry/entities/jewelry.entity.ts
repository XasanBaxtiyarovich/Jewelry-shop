import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Sample } from "../../samples/entities/sample.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity('jewelry')
export class Jewelry {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'country', description: 'Jewelry country'})
    @Column({type: 'text'})
    country: string;

    @ApiProperty({example: 'brand', description: 'Jewelry brand'})
    @Column({type: 'text'})
    brand: string;

    @ApiProperty({example: 'photo_url', description: 'Jewelry photo url'})
    @Column({type: 'text'})
    photo_url: string;

    @ApiProperty({example: 'price', description: 'Jewelry price'})
    @Column()
    price: number;

    @ApiProperty({example: 'category_id', description: 'Category primary key ID'})
    @ManyToOne((type) => Category, (category_id) => category_id.id)
    category_id: Category;

    @ApiProperty({example: 'sample_id', description: 'Sample primary key ID'})
    @ManyToOne((type) => Sample, (sample_id) => sample_id.id)
    sample_id: Sample;
}