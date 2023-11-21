import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShopingDto {
    @ApiProperty({example: 'phone', description: 'User phone number'})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: 'addres', description: 'User delivery addres'})
    @IsString()
    @IsNotEmpty()
    delivery_addres: string;

    @ApiProperty({example: 'user_id', description: 'Shoping primary key user ID'})
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: 'jewelry_id', description: 'Shoping primary key jewelry ID'})
    @IsNumber()
    @IsNotEmpty()
    jewelry_id: number;
}