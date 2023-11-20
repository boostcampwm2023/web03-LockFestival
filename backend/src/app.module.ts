import { DataSourceOptions, DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
