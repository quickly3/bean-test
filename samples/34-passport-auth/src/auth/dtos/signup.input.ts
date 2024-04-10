import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class SignupInput {
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  status: string;
}
