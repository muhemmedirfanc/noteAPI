import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from 'src/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
