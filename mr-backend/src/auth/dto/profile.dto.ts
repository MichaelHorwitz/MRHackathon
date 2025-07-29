import { UpdateUserDto } from 'src/user/dto/create-user.dto';

export class ProfileResult {
  id: number;
  name: string;
  email: string;
  expectedTravelDate: Date;
  watchedLocations: string;
}

export class UpdateProfileDto extends UpdateUserDto {
  expectedTravelDate: Date | undefined;
  watchedLocations: string | undefined;
}
