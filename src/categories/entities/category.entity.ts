import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'category_name', description: 'Jewelry category name'})
    @Column({type: 'text'})
    category_name: string

    @ApiProperty({example: 'parent_id', description: 'Category parent ID'})
    @ManyToOne((type) => Category, (parent) => parent.id)
    parent: Category;
}