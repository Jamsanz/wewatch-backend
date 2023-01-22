import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('My Boilerplate REST API (NESTJS)')
    .setDescription(
      "This is a boilerplate API I personally made to ease scaffolding NEST JS back with Mongoose ORM This API has authentication and authorization, and users API middleware config",
    )
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
