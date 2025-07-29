import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AuthLoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private configService: ConfigService) { }
    // todo - remove this with database check
    private readonly defaultUser = {
        id: '123',
        username: 'default@user.com',
        password: 'password123'
    };

    login(authDto: AuthLoginDto) {
        const { username, password } = authDto;

        if (
            username !== this.defaultUser.username ||
            password !== this.defaultUser.password
        ) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            id: this.defaultUser.id,
            username: this.defaultUser.username,
        };

        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new InternalServerErrorException();
        }
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '1h',
        });

        return { access_token: token };
    }
}
