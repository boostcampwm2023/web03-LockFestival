import { DataSource, DataSourceOptions } from 'typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { LoggerMiddleware } from '@src/utils/logger.middleware';
import { TypeormConfig } from '@src/typeorm.config';
import { AuthModule } from '@auth/auth.module';
import { ThemeModule } from '@theme/theme.module';
import { UserModule } from '@user/user.module';
import { CommentModule } from '@comment/comment.module';
import { DiaryModule } from '@diary/diary.module';
import { BranchModule } from '@branch/branch.module';
import { BrandModule } from '@brand/brand.module';
import { ChatModule } from '@chat/chat.module';
import { GroupModule } from '@group/group.module';
import { EventsModule } from '@src/gateway/events.module';
import { SEC_TO_MILLI } from '@constants/time.converter';

@Module({
  imports: [
    AuthModule,
    CommentModule,
    DiaryModule,
    BranchModule,
    BrandModule,
    ThemeModule,
    ChatModule,
    GroupModule,
    UserModule,
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfig, // TODO: typeorm 설정한 클래스
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URL'),
          dbName: configService.get<string>('MONGODB_DBNAME'),
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 5 * SEC_TO_MILLI,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
