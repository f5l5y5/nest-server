import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './response/response.interceptor';
import { ErrorFilter } from './error/error.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'taoism', // 加密
      rolling: true, // 每次请求添加cookie
      name: 'taoism-sid', // 存在浏览器cookie中的key
      cookie: { maxAge: null }, // 过期时间 ms
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述信息')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
