import { ApiProperty } from "@nestjs/swagger";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shoping } from "../../shoping/entities/shoping.entity";

@Entity('cash_payment')
export class CashPayment {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'shoping_id', description: 'Shoping primary key ID'})
    @ManyToOne((type) => Shoping, (shoping_id) => shoping_id.id)
    shoping_id: number;
}