import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCashPaymentDto {   
    @ApiProperty({example: 'shoping_id', description: 'Shoping primary key ID'})
    @IsNumber()
    @IsNotEmpty()
    shoping_id: number;
}
