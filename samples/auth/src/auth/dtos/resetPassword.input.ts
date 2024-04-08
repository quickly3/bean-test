import { IsString, MinLength } from 'class-validator';

export class ResetPasswordInput {
  @IsString()
  resetPasswordToken: string;

  @MinLength(8)
  @IsString()
  password: string;
}
