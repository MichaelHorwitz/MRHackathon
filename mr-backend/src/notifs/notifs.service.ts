import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notif.entity';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/create-notif.dto';

@Injectable()
export class NotifsService {
    async remove(id: number){
        await this.repo.delete(id);
    }
    update(id: number, dto: UpdateNotificationDto): Notification | PromiseLike<Notification> {
        return this.repo.save({ ...dto, id });
    }
    create(dto: CreateNotificationDto): Notification | PromiseLike<Notification> {
        return this.repo.save(dto);
    }
    constructor(
        @InjectRepository(Notification)
        private readonly repo: Repository<Notification>,
    ){}
    getAllNotifs(){
        return this.repo.find();
    }
    async markAllAsRead(){
        this.repo.updateAll({ status : 1 });
    }
    async markAsRead(id: number){
        const response = await this.repo.findOneBy({ id : id });

        if(response)
        {
            response.status = 1;
            await this.repo.save(response);
        }
    }
    

}
