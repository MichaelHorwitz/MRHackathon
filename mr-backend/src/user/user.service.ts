import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  // saltAndHashPassword(password: string): { salt: string; hashedPassword: string } {
  //   const salt = crypto.randomBytes(16).toString('hex');
  //   const hash = crypto.createHash('sha256');
  //   hash.update(password + salt);
  //   const hashedPassword = hash.digest('hex');
  //   return { salt, hashedPassword };
  // }

  // comparePassword(password: string, hashedPassword: string, salt: string): boolean {
  //   const hash = crypto.createHash('sha256');
  //   hash.update(password + salt);
  //   const computedHash = hash.digest('hex');
  //   return computedHash === hashedPassword;
  // }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.repo.save({ ...dto, password: hashedPassword });
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

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    user.password = hashedPassword;

    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repo.findOne({ where: { name: username } });
  }
}
