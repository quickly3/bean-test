import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app.service';

@Injectable()
export class ApikeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {
    super({ header: 'apikey' }, true, (apikey, done) => {
      const checkKey = this.checkvalidate(apikey);
      if (checkKey) {
        return done(false);
      }
      return done(true);
    });
  }

  checkvalidate(apiKey) {
    const _apiKey = this.configService.get('apikey');
    console.log(apiKey);
    console.log(_apiKey);

    return apiKey === _apiKey;
  }

  async validate(param): Promise<any> {
    console.log(param);
    return param;
  }
}
