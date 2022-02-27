import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Validation
  app.useGlobalPipes(new ValidationPipe({
    //The following code prevents the app of adding non existing property in the dto
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,//It transforms a payload into a DTO instance
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  await app.listen(3000);
}
bootstrap();
