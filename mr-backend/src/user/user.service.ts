import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

// src/user/user.service.ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  create(dto: CreateUserDto) {
    return this.repo.save(dto);
  }
  update(id: number, dto: UpdateUserDto) {
    return this.repo.save({ ...dto, id });
  }
  async remove(id: number) {
    await this.repo.delete(id);
  }
}
