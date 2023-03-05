import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('weWatch REST API')
    .setDescription(
      "This is the weWatch API made with NEST JS and Mongoose ORM. This API has authentication and authorization, and users API middleware config",
    )
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('issues')
    .addTag('notifications')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
