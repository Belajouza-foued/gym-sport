import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 autoriser frontend (Next.js)
  app.enableCors({
    origin: '*', // en dev seulement
  });

  // 🔥 global prefix (option senior)
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();