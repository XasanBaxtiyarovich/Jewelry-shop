import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCardPaymentDto {
    @ApiProperty({example: 'card_number', description: 'Jewelry buy payment card number'})
    @IsString()
    @IsNotEmpty()
    card_number: string;

    @ApiProperty({example: 'card_valid_thru', description: 'Jewelry buy payment card valid thru'})
    @IsString()
    @IsNotEmpty()
    card_valid_thru: string;

    @ApiProperty({example: 'card_cvv', description: 'Jewelry buy payment card cvv'})
    @IsNumber()
    @IsNotEmpty()
    card_cvv: number;

    @ApiProperty({example: 'shoping_id', description: 'Shoping primary key ID'})
    @IsNumber()
    @IsNotEmpty()
    shoping_id: number;
}