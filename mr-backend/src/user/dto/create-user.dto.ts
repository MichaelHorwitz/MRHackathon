import { PartialType } from '@nestjs/swagger';
import { IsDate, IsString, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @IsString()
    password: string;

    @IsString()
    @Matches(/^(\s*\w+\s*)(,\s*\w+\s*)*$/, { message: 'watchedLocations must be a comma separated list of strings' })
    watchedLocations: string;

    @IsDate()
    expectedTravelDate: Date;
}

export class CreateUserResponseDto {
    id: number;
    name: string;
    email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
