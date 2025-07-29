import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.repo.save({ ...dto, password: hashedPassword });
  }
  async update(id: number, dto: UpdateUserDto) {
    const updateData = { ...dto, id };
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }
    return this.repo.save(updateData);
  }
  async remove(id: number) {
    await this.repo.delete(id);
  }
}
