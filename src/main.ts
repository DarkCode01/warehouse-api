import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // http-response
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Api Documentation
  const config = new DocumentBuilder()
    .setTitle('Rivero-do')
    .setDescription(
      'Rivero-do API helps warehouse teams decide which locations (bins) to audit first when checking inventory',
    )
    .setVersion('1.0')
    .addTag('rivero')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
