import {
    Body,
    Controller,
    Post,
    ValidationPipe,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(
        @Body(
            new ValidationPipe({
                stopAtFirstError: true,
                transform: true,
                whitelist: true,
                exceptionFactory: (errors) => {
                    const firstError = errors[0];
                    const message =
                        Object.values(firstError.constraints || {})[0] ||
                        'Invalid login payload.';
                    return new BadRequestException(message);
                },
            }),
        )
        authDto: AuthLoginDto,
    ) {
        return this.authService.login(authDto);
    }
}
