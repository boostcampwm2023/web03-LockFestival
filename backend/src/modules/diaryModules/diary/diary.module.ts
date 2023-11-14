import { Diary } from '@diary/entities/diary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
})
export class DiaryModule {}
