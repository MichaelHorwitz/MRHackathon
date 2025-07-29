import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export type SafeUser = {
  id: number;
  email: string;
};
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<SafeUser | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      Logger.debug('COULD NOT FIND USER: ', email);
      return null;
    }
    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      return null;
    }
    const result: SafeUser = {
      id: user.id,
      email: user.email,
    };
    return result;
  }
  login(user: SafeUser): { access_token: string } {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  signUp(user: CreateUserDto) {
    return this.userService.create(user);
  }
}
