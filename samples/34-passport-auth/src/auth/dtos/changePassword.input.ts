import { IsString, MinLength } from 'class-validator';

export class ChangePasswordInput {
  @IsString()
  oldPassword: string;

  @MinLength(8)
  @IsString()
  newPassword: string;
}
