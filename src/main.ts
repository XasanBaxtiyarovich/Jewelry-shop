import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('экзамен 5')
  .setDescription('Тестовое задание')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgress, TypeORM, JWT, Swagger, Docker')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.API_PORT || 3333;
  await app.listen(PORT, () => {
    console.log('SERVER RUNING PORT: '+PORT);
  });
}
bootstrap();