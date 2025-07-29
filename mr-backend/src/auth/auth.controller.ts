import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  Put,
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
import { UserService } from 'src/user/user.service';
import { ProfileResult, UpdateProfileDto } from './dto/profile.dto';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}
interface DatabaseError extends Error {
  code?: string;
  constraint?: string;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
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
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<ProfileResult> {
    const result = await this.userService.findOne(req.user.id);
    if (!result) {
      throw new NotFoundException('Could not find user');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...sanitizedResult } = result;
    return sanitizedResult;
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  @ApiBearerAuth()
  async updateProfile(
    @Body() dto: UpdateProfileDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<ProfileResult> {
    const result = await this.userService.update(req.user.id, dto);
    if (!result) {
      throw new NotFoundException('Could not find user');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...sanitizedResult } = result;
    Logger.debug(`Updated: ${JSON.stringify(sanitizedResult)}`);
    return sanitizedResult;
  }
}
