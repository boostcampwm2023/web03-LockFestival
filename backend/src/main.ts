import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import { HTTP_ALLOWED_METHOD } from '@enum/http.method';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from '@src/utils/logger';
import { RedisIoAdapter } from '@src/adapter/redis.io.adapter';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors({
    origin: app.get(ConfigService).get('FRONTEND_BASE_URL'),
    methods: Object.keys(HTTP_ALLOWED_METHOD),
    credentials: true,
  });

  const redisIoAdapter = new RedisIoAdapter(app, app.get(ConfigService));
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('LockFestival API')
    .setDescription('LockFestival API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' }, 'Authorization')
    .build();

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, swaggerOptions);

  await app.listen(app.get(ConfigService).get('PORT') || 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      return app.close();
    });
  }
}
bootstrap();
