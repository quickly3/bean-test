import { IsString } from 'class-validator';

export class RefreshTokenInout {
  @IsString()
  refreshToken: string;
}
