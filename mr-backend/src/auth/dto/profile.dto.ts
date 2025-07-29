import { UpdateUserDto } from 'src/user/dto/create-user.dto';

export class ProfileResult {
  id: number;
  name: string;
  email: string;
}

export class UpdateProfileDto extends UpdateUserDto {}
