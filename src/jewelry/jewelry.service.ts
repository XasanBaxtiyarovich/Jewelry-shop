import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Jewelry } from './entities/jewelry.entity';
import { FilesService } from '../files/files.service';
import { CreateJewelryDto, UpdateJewelryDto } from './dto';

@Injectable()
export class JewelryService {
  constructor(
    @InjectRepository(Jewelry) private readonly jewelryRepo: Repository<Jewelry>,
    private readonly fileService: FilesService,
  ) {}

  async createJEWELRY(createJewelryDto: CreateJewelryDto, jewelry_photo: any): Promise<Jewelry> {
    const photo_url = await this.fileService.createFile(jewelry_photo);

    const jewelry = await this.jewelryRepo.save({...createJewelryDto, photo_url})

    return jewelry;
  }

  async findAllJEWELRY(): Promise<Jewelry[] | HttpStatus> {
    const jewelries = await this.jewelryRepo.find({ relations: ['category_id', 'sample_id'] });

    if(jewelries.length === 0) return HttpStatus.NOT_FOUND;

    return jewelries;
  }

  async findOneJEWELRY(id: number): Promise<Jewelry | HttpStatus> {
    const jewelry = await this.jewelryRepo.findOne({where: {id}, relations: ['category_id', 'sample_id']});

    if (!jewelry) return HttpStatus.NOT_FOUND;

    return jewelry;
  }

  async updateJEWELRY(id: number, updateJewelryDto: UpdateJewelryDto, jewelry_photo: any): Promise<Jewelry | HttpStatus> {
    const jewelry = await this.jewelryRepo.findOne({where: {id}});

    if (!jewelry) return HttpStatus.NOT_FOUND;

    const photo_url = await this.fileService.createFile(jewelry_photo);

    await this.jewelryRepo.update({id}, {...updateJewelryDto, photo_url});

    const updateJewelry = await this.jewelryRepo.findOne({where: {id}, relations: ['category_id', 'sample_id']});
    return updateJewelry;
  }

  async removeJEWELRY(id: number): Promise<Boolean | HttpStatus> {
    const jewelry = await this.jewelryRepo.findOne({where: {id}});
    
    if (!jewelry) return HttpStatus.NOT_FOUND;

    await this.jewelryRepo.delete({id});

    return true;
  }
}
