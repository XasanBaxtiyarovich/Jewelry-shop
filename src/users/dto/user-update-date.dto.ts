import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDateDto {
    @ApiProperty({ example: 'name', description: 'User first name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;
}