import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('applications')
export class SendApplication {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'phone', description: 'User phone number'})
    @Column({type: 'text'})
    phone: string;

    @ApiProperty({example: 'description', description: 'User description'})
    @Column({type: 'text'})
    description: string;

    @ApiProperty({example: 'user_id', description: 'User ID'})
    @Column()
    @ManyToOne((type) => User, (user_id) => user_id.id)
    user_id: number;
}
