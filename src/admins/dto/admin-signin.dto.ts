import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'mail', description: 'Admin Mail'})
    @IsEmail()
    mail: string;

    @ApiProperty({ example: 'password', description: 'Admin Password'})
    @IsString()
    password: string;
}