import { Group } from '@group/entities/group.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from '@group/group.controller';
import { GroupService } from '@group/group.service';
import { GroupRepository } from '@group/group.repository';
import { UserModule } from '@user/user.module';
import { ThemeModule } from '@theme/theme.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule, ThemeModule],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
