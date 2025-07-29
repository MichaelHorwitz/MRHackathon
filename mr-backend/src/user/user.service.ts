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
    // First, find the existing user
    const existingUser = await this.repo.findOneBy({ id });
    if (!existingUser) {
      return null;
    }

    // Prepare update data
    const updateData: Partial<User> = { ...dto };

    // Hash password if provided
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    // Merge with existing user data
    const updatedUser = this.repo.merge(existingUser, updateData);

    // Save the merged entity
    return this.repo.save(updatedUser);
  }
  async remove(id: number) {
    await this.repo.delete(id);
  }
}
