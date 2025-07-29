import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  watchedLocations: string;
  expectedTravelDate: Date;
}

export class CreateUserResponseDto {
  id: number;
  name: string;
  email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
