import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JewelryService } from './jewelry.service';
import { Jewelry } from './entities/jewelry.entity';
import { FilesModule } from '../files/files.module';
import { JewelryController } from './jewelry.controller';
import { Sample } from '../samples/entities/sample.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Sample, Jewelry]),
    JwtModule.register({}),
    FilesModule
  ],
  controllers: [JewelryController],
  providers: [JewelryService],
})
export class JewelryModule {}
