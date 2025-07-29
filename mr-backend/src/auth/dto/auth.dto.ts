import { IsString, MinLength, IsNotEmpty } from 'class-validator';

const GENERIC_AUTH_ERROR = 'Invalid request.';

export class AuthLoginDto {
  @IsString({ message: GENERIC_AUTH_ERROR })
  @IsNotEmpty({ message: GENERIC_AUTH_ERROR })
  username: string;

  @IsString({ message: GENERIC_AUTH_ERROR })
  @MinLength(6, { message: GENERIC_AUTH_ERROR })
  @IsNotEmpty({ message: GENERIC_AUTH_ERROR })
  password: string;
}