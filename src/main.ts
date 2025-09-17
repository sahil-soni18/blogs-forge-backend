import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Portfolio Forge API')
    .setDescription('The Portfolio Forge API documentation')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger documentation available at: http://localhost:${port}/api`,
  );
}
bootstrap();
