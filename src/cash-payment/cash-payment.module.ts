import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CashPaymentService } from './cash-payment.service';
import { CashPayment } from './entities/cash-payment.entity';
import { CashPaymentController } from './cash-payment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashPayment]),
    JwtModule.register({}),
  ],
  controllers: [CashPaymentController],
  providers: [CashPaymentService],
})
export class CashPaymentModule {}
