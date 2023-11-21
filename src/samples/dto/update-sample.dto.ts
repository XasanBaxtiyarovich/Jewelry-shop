import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSampleDto {
    @ApiProperty({example: 'samples-type', description: 'Jewelry samles type'})
    @IsNotEmpty()
    @IsNumber()
    samples: number
}
