import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { SendApplication } from './entities/send-application.entity';
import { CreateSendApplicationDto } from './dto/create-send-application.dto';

@Injectable()
export class SendApplicationService {
  constructor(@InjectRepository(SendApplication) private readonly sendApplicationRepo: Repository<SendApplication>) {}

  async createAPPLICATIONS(createSendApplicationDto: CreateSendApplicationDto): Promise<Boolean | HttpStatus> {
    const application = await this.sendApplicationRepo.findOne(
      {
        where: {id: createSendApplicationDto.user_id}
      }
    )
    if (application) return HttpStatus.FORBIDDEN;
    await this.sendApplicationRepo.save({...createSendApplicationDto})

    return true;
  }

  async findAllAPPLICATIONS(): Promise<SendApplication[] | HttpStatus> {
    const applications = await this.sendApplicationRepo.find({ relations: ['user_id'] });

    if (applications.length === 0) return HttpStatus.NOT_FOUND;

    return applications;
  }

  async findOneAPPLICATIONS(id: number): Promise<SendApplication | HttpStatus> {
    const application = await this.sendApplicationRepo.findOne({where: {id}, relations: ['user_id']});

    if (!application) return HttpStatus.NOT_FOUND;

    return application;
  }

  async removeAPPLICATIONS(id: number): Promise<Boolean | HttpStatus> {
    const application = await this.sendApplicationRepo.findOne({where: {id}, relations: ['user_id']});

    if (!application) return HttpStatus.NOT_FOUND;

    await this.sendApplicationRepo.delete({id});
    return true;
  }
}
