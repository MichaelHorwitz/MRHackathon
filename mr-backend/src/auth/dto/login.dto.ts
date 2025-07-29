import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username for authentication',
    example: 'john_doe',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password for authentication',
    example: 'password123',
  })
  @IsString()
  password: string;
}
