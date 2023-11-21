import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sample } from './entities/sample.entity';
import { SamplesService } from './samples.service';
import { SamplesController } from './samples.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sample]),
    JwtModule.register({}),
  ],
  controllers: [SamplesController],
  providers: [SamplesService],
})
export class SamplesModule {}
