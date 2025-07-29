import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthLoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    // todo - remove this with database check
    private readonly defaultUser = {
        id: '123',
        email: 'default@user.com',
        password: 'password123',
        role: 'user',
    };

    login(authDto: AuthLoginDto) {
        const { email, password } = authDto;

        if (
            email !== this.defaultUser.email ||
            password !== this.defaultUser.password
        ) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: this.defaultUser.id,
            email: this.defaultUser.email,
            role: this.defaultUser.role,
        };

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new InternalServerErrorException('JWT secret not configured');
        }
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '1h',
        });

        return { access_token: token };
    }
}
