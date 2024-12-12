import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
  app.setGlobalPrefix('api'); // Optional: Set global prefix
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}

bootstrap();
