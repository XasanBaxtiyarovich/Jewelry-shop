import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entities/admin.entity';
import { MailModule } from '../mail/mail.module';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
