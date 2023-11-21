import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ example: 'name', description: 'User first name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Mail', description: 'User Mail'})
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @ApiProperty({ example: 'Password', description: 'User website password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}