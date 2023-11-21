import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { SendApplication } from './entities/send-application.entity';
import { SendApplicationService } from './send-application.service';
import { SendApplicationController } from './send-application.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SendApplication]),
    JwtModule.register({})
  ],
  controllers: [SendApplicationController],
  providers: [SendApplicationService],
})
export class SendApplicationModule {}
