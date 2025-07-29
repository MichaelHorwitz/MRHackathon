// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/requests-formats';
import { ResetPasswordDto } from './dto/requests-formats';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SafeUser } from 'src/auth/auth.service';
import { AuthenticatedRequest } from 'src/utils/types';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth()
  async getProfile(@Request() req: AuthenticatedRequest): Promise<SafeUser> {
    return req.user;
  }


  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch('update')
  async update(@Request() req: AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    const updated = await this.userService.update(req.user.id, updateUserDto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async resetPassword(
    @Request() req: AuthenticatedRequest,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const updated = await this.userService.resetPassword(req.user.id, resetPasswordDto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}

