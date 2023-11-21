import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardPaymentService } from './card-payment.service';
import { CardPayment } from './entities/card-payment.entity';
import { Shoping } from '../shoping/entities/shoping.entity';
import { CardPaymentController } from './card-payment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardPayment, Shoping]),
    JwtModule.register({}),
  ],
  controllers: [CardPaymentController],
  providers: [CardPaymentService],
})
export class CardPaymentModule {}
