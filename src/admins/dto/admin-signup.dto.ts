import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ example: 'name', description: 'Admin first name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'lastname', description: 'Admin last name'})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: 'birthday', description: 'Admin birthday date'})
    @IsString()
    @IsNotEmpty()
    birthday_date: string;
    
    @ApiProperty({ example: 'phone', description: 'Admin phone number'})
    @IsPhoneNumber('UZ')
    phone: string; 

    @ApiProperty({ example: 'Mail', description: 'Admin Mail'})
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @ApiProperty({ example: 'Password', description: 'Admin website password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}