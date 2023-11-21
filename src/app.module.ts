import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MailModule } from './mail/mail.module';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/entities/admin.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { SamplesModule } from './samples/samples.module';
import { Sample } from './samples/entities/sample.entity';
import { FilesModule } from './files/files.module';
import { JewelryModule } from './jewelry/jewelry.module';
import { Jewelry } from './jewelry/entities/jewelry.entity';
import { SendApplicationModule } from './send-application/send-application.module';
import { SendApplication } from './send-application/entities/send-application.entity';
import { CashPaymentModule } from './cash-payment/cash-payment.module';
import { CashPayment } from './cash-payment/entities/cash-payment.entity';
import { CardPaymentModule } from './card-payment/card-payment.module';
import { CardPayment } from './card-payment/entities/card-payment.entity';
import { ShopingModule } from './shoping/shoping.module';
import { Shoping } from './shoping/entities/shoping.entity';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),

    ServeStaticModule.forRoot(
      {
        rootPath: resolve(__dirname, 'static')
      }
    ),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ Admin, User, Category, Sample, Jewelry, SendApplication, CashPayment, CardPayment, Shoping ],
      synchronize: true,
    }),

    MailModule,

    AdminsModule,

    UsersModule,

    CategoriesModule,

    SamplesModule,

    FilesModule,

    JewelryModule,

    SendApplicationModule,

    CashPaymentModule,

    CardPaymentModule,

    ShopingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}