import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Sample } from './entities/sample.entity';
import { CreateSampleDto, UpdateSampleDto } from './dto';

@Injectable()
export class SamplesService {
  constructor(@InjectRepository(Sample) private readonly sampleRepo: Repository<Sample>) {}

  async createSAMPLE(createSampleDto: CreateSampleDto): Promise<Sample | HttpStatus> {
    const sample = await this.sampleRepo.findOne(
      {
        where: {samples: createSampleDto.samples}
      }
    )
    if(sample) return HttpStatus.CONFLICT;

    return this.sampleRepo.save({...createSampleDto});
  }

  async findAllSAMPLES(): Promise<Sample[] | HttpStatus> {
    const samples = await this.sampleRepo.find();

    if(samples.length === 0) return HttpStatus.NOT_FOUND;

    return samples;
  }

  async findOneSAMPLE(id: number): Promise<Sample | HttpStatus> {
    const [sample] = await this.sampleRepo.findBy({id});

    if (!sample) return HttpStatus.NOT_FOUND;

    return sample;
  }

  async updateSAMPLE(id: number, updateSampleDto: UpdateSampleDto): Promise<Sample | HttpStatus> {
    const [sample] = await this.sampleRepo.findBy({id});
    if (!sample) return HttpStatus.NOT_FOUND;

    const sampleNameConflict = await this.sampleRepo.findOne({ where: {samples: updateSampleDto.samples} });
    if(sampleNameConflict) return HttpStatus.CONFLICT;

    await this.sampleRepo.update({id}, {samples: updateSampleDto.samples });

    const updateSample = await this.sampleRepo.findOne({ where: {samples: updateSampleDto.samples} });
    return updateSample;
  }

  async removeSAMPLE(id: number): Promise<Boolean | HttpStatus> {
    const [sample] = await this.sampleRepo.findBy({id});

    if (!sample) return HttpStatus.NOT_FOUND;

    await this.sampleRepo.delete({id});
    return true;
  }
}