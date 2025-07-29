
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: any) {
        // user is already validated by Passport local strategy
        const payload = {
            id: user.id,
            username: user.username,
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
