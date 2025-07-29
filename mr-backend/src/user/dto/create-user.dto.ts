import { PartialType } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";


export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
