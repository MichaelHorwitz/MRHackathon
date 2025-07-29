// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/password-reset.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const updated = await this.userService.update(id, updateUserDto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  @Patch(':id/reset-password')
  async resetPassword(
    @Param('id') id: number,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const updated = await this.userService.resetPassword(id, resetPasswordDto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
