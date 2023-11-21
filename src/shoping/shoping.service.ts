import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoping } from './entities/shoping.entity';

import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopingDto, UpdateShopingDto } from './dto';

@Injectable()
export class ShopingService {
  constructor(@InjectRepository(Shoping) private readonly shopingRepo: Repository<Shoping>) {}

  createSHOPING(createShopingDto: CreateShopingDto): Promise<Shoping> {
    return this.shopingRepo.save({...createShopingDto});
  }

  async findAllSHOPING(): Promise<Shoping[] | HttpStatus> {
    const shoping = await this.shopingRepo.find({relations: ['user_id', 'jewelry_id']});

    if(shoping.length === 0) return HttpStatus.NOT_FOUND;

    return shoping;
  }

  async findOneSHOPING(id: number): Promise<Shoping | HttpStatus> {
    const shoping = await this.shopingRepo.findOne({where: {id}, relations: ['user_id', 'jewelry_id']});

    if(!shoping) return HttpStatus.NOT_FOUND;

    return shoping;
  }

  async updateSHOPING(id: number, updateShopingDto: UpdateShopingDto): Promise<Shoping | HttpStatus> {
    const shoping = await this.shopingRepo.findOne({where: {id}});

    if(!shoping) return HttpStatus.NOT_FOUND;

    await this.shopingRepo.update({id}, {...updateShopingDto});

    return this.shopingRepo.findOne({where: {id}, relations: ['user_id', 'jewelry_id']});;
  }

  async removeSHOPING(id: number): Promise<Boolean | HttpStatus> {
    const shoping = await this.shopingRepo.findOne({where: {id}});

    if(!shoping) return HttpStatus.NOT_FOUND;

    await this.shopingRepo.delete({id});
    return true;
  }
}
