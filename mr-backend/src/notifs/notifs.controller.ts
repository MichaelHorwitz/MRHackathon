import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotifsService } from './notifs.service';
import { Notification } from './notif.entity'

@Controller('notifs')
export class NotifsController {
    constructor (
        private notifsService: NotifsService
    ){}

    @Get()
    async getAll(): Promise<Notification[]>
    {
        return this.notifsService.getAllNotifs();
    }

    @Patch(':id/read')
    markAsRead(@Param('id') id : string) : Notification
    {
        return this.notifsService.markAsRead(id);
    }

    @Patch('mark-all-read')
    markAllAsRead() : Notification []
    {
        return this.notifsService.markAllAsRead();
    }
}
