import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //각 data type이 적합하지 않으면 애초에  validation에  들어오지 못함
      forbidNonWhitelisted: true,
      transform: true, // 유저들이 보낸 것을 원하는 실제타입으로 바꿔줌
    }),
  );

  await app.listen(3000);
}
bootstrap();
