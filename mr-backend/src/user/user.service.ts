import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CreateUserDto, UpdateUserDto } from './dto/requests-formats';
import { ResetPasswordDto } from './dto/requests-formats';

// user.service.ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) { }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  saltAndHashPassword(password: string): { salt: string; hashedPassword: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    const hashedPassword = hash.digest('hex');
    return { salt, hashedPassword };
  }

  async create(dto: CreateUserDto) {
    const { salt, hashedPassword } = this.saltAndHashPassword(dto.password);
    return this.repo.save({ ...dto, password: hashedPassword, salt });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;

    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async resetPassword(id: number, dto: ResetPasswordDto) {
    const user: User | null = await this.repo.findOneBy({ id });
    if (!user) return null;

    const { salt, hashedPassword } = this.saltAndHashPassword(dto.password);
    user.password = hashedPassword;
    user.salt = salt;

    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repo.findOne({ where: { username } });
  }
}
