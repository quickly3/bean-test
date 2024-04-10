import {
  Controller,
  Post,
  HttpCode,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { TokenModel } from './auth/models/token.model';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApikeyAuthGuard } from './auth/guards/apikey-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req): Promise<any> {
    const token: TokenModel = await this.appService.login(req.user);
    return {
      ...token,
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req): Promise<any> {
    return this.appService.getUserById(req.user.id);
  }

  @UseGuards(ApikeyAuthGuard)
  @Get('apikey-check')
  async apikeyCheck(): Promise<any> {
    return true;
  }
}
