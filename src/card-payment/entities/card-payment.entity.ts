import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shoping } from "../../shoping/entities/shoping.entity";

@Entity('card_payment')
export class CardPayment {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'card_number', description: 'Jewelry buy payment card number'})
    @Column({type: 'text'})
    card_number: string;

    @ApiProperty({example: 'card_valid_thru', description: 'Jewelry buy payment card valid thru'})
    @Column({type: 'text'})
    card_valid_thru: string;

    @ApiProperty({example: 'card_cvv', description: 'Jewelry buy payment card cvv'})
    @Column()
    card_cvv: number;

    @ApiProperty({example: 'shoping_id', description: 'Shoping primary key ID'})
    @ManyToOne((type) => Shoping, (shoping_id) => shoping_id.id)
    shoping_id: number;
}