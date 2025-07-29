import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
