import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const options = new DocumentBuilder().setTitle('I love coffee').setDescription('Coffee application').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
