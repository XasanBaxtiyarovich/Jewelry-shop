import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({ example: 'password', description: 'Admin old password'})
    @IsString()
    password: string;

    @ApiProperty({ example: 'new_password', description: 'Admin new password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    new_password: string;

    @ApiProperty({ example: 'confirm_password', description: 'Admin new confirm password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    confirm_password: string;
}