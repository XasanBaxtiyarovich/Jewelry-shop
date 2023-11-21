import { PartialType } from '@nestjs/swagger';
import { CreateShopingDto } from './create-shoping.dto';

export class UpdateShopingDto extends PartialType(CreateShopingDto) {}