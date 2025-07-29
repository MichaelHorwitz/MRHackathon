import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, ResetPasswordDto } from './dto';
import * as crypto from 'crypto';

// user.service.ts
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

  async update(id: number, dto: UpdateUserDto) {
    // Do not allow updating password or salt here
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;

    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async resetPassword(id: number, dto: ResetPasswordDto) {
    const user: User | null = await this.repo.findOneBy({ id });
    if (!user) return null;

    // Generate a random salt
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the password with SHA-256 and salt
    const hash = crypto.createHash('sha256');
    hash.update(dto.password + salt);
    user.password = hash.digest('hex');
    user.salt = salt;

    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repo.findOne({ where: { username } });
  }
}
