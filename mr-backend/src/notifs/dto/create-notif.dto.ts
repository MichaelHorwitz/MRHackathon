import { PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, isString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
