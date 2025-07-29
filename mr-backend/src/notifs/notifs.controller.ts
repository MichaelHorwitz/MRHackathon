import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { NotifsService } from './notifs.service';
import { Notification } from './notif.entity'
import { CreateNotificationDto, UpdateNotificationDto } from './dto/create-notif.dto';

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

    @Post()
    async create(@Body() dto: CreateNotificationDto): Promise<Notification>
    {
        return this.notifsService.create(dto);
    }

    @Put()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateNotificationDto): Promise<Notification>
    {
        return this.notifsService.update(id, dto);
    }

    @Patch(':id/read')
    async markAsRead(@Param('id') id : number)
    {
        console.log("Read")
        this.notifsService.markAsRead(id);
    }

    @Get('/mark-all-read')
    markAllAsRead()
    {
        console.log("Mark all Read")
        this.notifsService.markAllAsRead();
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.notifsService.remove(id);
    }
}
