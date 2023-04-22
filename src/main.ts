import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';

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
  await app.listen(3000);
}
bootstrap();
