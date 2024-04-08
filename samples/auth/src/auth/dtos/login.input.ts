import { IsEmail, IsString } from 'class-validator';

export class LoginInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AccessKeyLoginInput {
  @IsString()
  access_key: string;
}
