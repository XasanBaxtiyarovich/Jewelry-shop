import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { CashPayment } from './entities/cash-payment.entity';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';

@Injectable()
export class CashPaymentService {
  constructor(@InjectRepository(CashPayment) private readonly cashPaymentRepo: Repository<CashPayment>) {}

  createCASH(createCashPaymentDto: CreateCashPaymentDto): Promise<CashPayment> {
    return this.cashPaymentRepo.save({...createCashPaymentDto});
  }

  async findOneCASH(id: number): Promise<CashPayment | HttpStatus> {
    const cashPayment = await this.cashPaymentRepo.findOne({where: {id}, relations: ['shoping_id']})

    if (!cashPayment) return HttpStatus.NOT_FOUND;

    return cashPayment;
  }

  async removeCASH(id: number): Promise<Boolean | HttpStatus> {
    const cashPayment = await this.cashPaymentRepo.findOne({where: {id}})

    if (!cashPayment) return HttpStatus.NOT_FOUND;

    await this.cashPaymentRepo.delete({id});

    return true;
  }
}
