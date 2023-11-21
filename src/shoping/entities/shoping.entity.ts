import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Jewelry } from "../../jewelry/entities/jewelry.entity";

@Entity('shoping')
export class Shoping {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'phone', description: 'User phone number'})
    @Column({type: 'text'})
    phone: string;

    @ApiProperty({example: 'addres', description: 'User delivery addres'})
    @Column({type: 'text'})
    delivery_addres: string;

    @ApiProperty({example: 'user_id', description: 'Shoping primary key user ID'})
    @ManyToOne((type) => User, (user_id) => user_id.id)
    user_id: number;

    @ApiProperty({example: 'jewelry_id', description: 'Shoping primary key jewelry ID'})
    @ManyToOne((type) => Jewelry, (jewelry_id) => jewelry_id.id)
    jewelry_id: number;

    @CreateDateColumn()
    createAt: Date;
}