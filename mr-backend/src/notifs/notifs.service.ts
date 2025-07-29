import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notif.entity';

@Injectable()
export class NotifsService {
    constructor(
        @InjectRepository(Notification)
        private readonly repo: Repository<Notification>,
    ){}
    getAllNotifs(){
        return this.repo.find();
    }
    markAllAsRead() : Notification[]{
        throw new Error('Method not implemented.');
    }
    markAsRead(id: string) : Notification{
        throw new Error('Method not implemented.');
    }
    

}
