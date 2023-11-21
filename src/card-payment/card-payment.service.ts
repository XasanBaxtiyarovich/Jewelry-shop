import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common'
;
import { CardPayment } from './entities/card-payment.entity';
import { CreateCardPaymentDto, UpdateCardPaymentDto } from './dto';

@Injectable()
export class CardPaymentService {
  constructor(@InjectRepository(CardPayment) private readonly cardPaymentRepo: Repository<CardPayment>) {}

  createCARD(createCardPaymentDto: CreateCardPaymentDto): Promise<CardPayment> {
    return this.cardPaymentRepo.save({...createCardPaymentDto});
  }

  async findAllCARD(): Promise<CardPayment[] | HttpStatus> {
    const cardPayments = await this.cardPaymentRepo.find({relations: ['shoping_id']});

    if(cardPayments.length === 0) return HttpStatus.NOT_FOUND;

    return cardPayments;
  }

  async findOneCARD(id: number): Promise<CardPayment | HttpStatus> {
    const cardPayment = await this.cardPaymentRepo.findOne({where: {id}, relations: ['shoping_id']});

    if(!cardPayment) return HttpStatus.NOT_FOUND;

    return cardPayment;
  }

  async updateCARD(id: number, updateCardPaymentDto: UpdateCardPaymentDto): Promise<CardPayment | HttpStatus> {
    const [cardPayment] = await this.cardPaymentRepo.findBy({id});

    if(!cardPayment) return HttpStatus.NOT_FOUND;

    await this.cardPaymentRepo.update({id}, {...updateCardPaymentDto})

    const cardPaymentUpdate = await this.cardPaymentRepo.findOne({where: {id}, relations: ['shoping_id']});
    return cardPaymentUpdate;
  }

  async removeCARD(id: number): Promise<Boolean | HttpStatus> {
    const [cardPayment] = await this.cardPaymentRepo.findBy({id});

    if(!cardPayment) return HttpStatus.NOT_FOUND;

    await this.cardPaymentRepo.delete({id});

    return true;
  }
}