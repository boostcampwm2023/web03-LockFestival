import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HTTP_ALLOWED_METHOD } from '@enum/http.method';
import { ConfigService } from '@nestjs/config';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors({
    origin: app.get(ConfigService).get('FRONTEND_BASE_URL'),
    methods: Object.keys(HTTP_ALLOWED_METHOD),
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(app.get(ConfigService).get('PORT') || 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      return app.close();
    });
  }
}
bootstrap();
