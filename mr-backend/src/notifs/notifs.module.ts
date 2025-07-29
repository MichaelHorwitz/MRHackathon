import { Module } from '@nestjs/common';
import { NotifsController } from './notifs.controller';
import { NotifsService } from './notifs.service';
import { Notification } from './notif.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotifsController],
  providers: [NotifsService]
})
export class NotifsModule {}
