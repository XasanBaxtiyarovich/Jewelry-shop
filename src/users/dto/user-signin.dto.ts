import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'Mail', description: 'User Mail'})
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @ApiProperty({ example: 'Password', description: 'User website password'})
    @IsNotEmpty()
    password: string;
}