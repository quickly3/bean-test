import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApikeyAuthGuard extends AuthGuard('headerapikey') {
  handleRequest(err, user) {
    console.log(err, user);
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      throw new UnauthorizedException('Invalid apikey.');
    }
    return user;
  }
}
