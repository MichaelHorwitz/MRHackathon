import { Module } from '@nestjs/common';
import { NotifsController } from './notifs.controller';
import { NotifsService } from './notifs.service';

@Module({
  controllers: [NotifsController],
  providers: [NotifsService]
})
export class NotifsModule {}
