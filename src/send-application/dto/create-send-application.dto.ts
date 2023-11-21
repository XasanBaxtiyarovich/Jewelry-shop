import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateSendApplicationDto {
    @ApiProperty({example: 'phone', description: 'User phone number'})
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone: string;

    @ApiProperty({example: 'description', description: 'User description'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: 'user_id', description: 'User ID'})
    @IsNotEmpty()
    user_id: number;
}