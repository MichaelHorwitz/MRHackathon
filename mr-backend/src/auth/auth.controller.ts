import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponseDto,
} from 'src/user/dto/create-user.dto';
import { SafeUser } from './auth.dto';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}
interface DatabaseError extends Error {
  code?: string;
  constraint?: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(
    @Body() dto: LoginDto,
    @Request() req: AuthenticatedRequest,
  ): LoginResponseDto {
    return this.authService.login(req.user);
  }
  @Post('signUp')
  async signUp(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = await this.authService.signUp(dto);
      return result;
    } catch (error: unknown) {
      console.log('SignUp error:', error);

      const dbError = error as DatabaseError;

      if (dbError.code === '23505') {
        throw new ConflictException('User already exists');
      }

      throw new BadRequestException('Failed to create user');
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req: AuthenticatedRequest): SafeUser {
    return req.user;
  }
}
