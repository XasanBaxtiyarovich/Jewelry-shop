import { Module } from '@nestjs/common';
import { ShopingService } from './shoping.service';
import { ShopingController } from './shoping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Jewelry } from '../jewelry/entities/jewelry.entity';
import { Shoping } from './entities/shoping.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Jewelry, Shoping]),
    JwtModule.register({})
  ],
  controllers: [ShopingController],
  providers: [ShopingService],
})
export class ShopingModule {}
