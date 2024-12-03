import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        'https://gai-clearance-form.vercel.app'
      ],
      credentials: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
