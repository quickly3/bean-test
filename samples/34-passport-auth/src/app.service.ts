import { Injectable } from '@nestjs/common';
import { TokenModel } from './auth/models/token.model';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  users = [
    {
      id: 1,
      name: 'test1',
      email: 'email@email.com',
      password: '$2a$10$gC0ezf.rVZrpgzsy7pIQYeuvsXIaVq.satBHJ2UL/IzX74a.Bd7mS', // xxx
    },
  ];

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: any): Promise<any> {
    const token = this.generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      ...token,
      user,
    };
  }

  generateToken(payload: { id: number; [prop: string]: any }): TokenModel {
    const expiresIn = '10h';
    const refreshExpiresIn = '30min';

    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn,
    });
    const refreshToken: string = this.jwtService.sign(payload, {
      expiresIn: refreshExpiresIn,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  getUserById(id) {
    return _.find(this.users, (u) => u.id === id);
  }

  async getUserByEmailPassword(email: string, password: string): Promise<any> {
    const user = _.find(this.users, (u) => u.email === email);

    if (user) {
      const passwordValid = await this.validatePassword(
        password,
        user.password,
      );
      if (passwordValid) {
        return user;
      }
    }
    return null;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hashedPassword);
  }
  async hashPassword(password: string): Promise<string> {
    const bcryptSaltRounds = this.configService.get(
      'password.bcryptSaltRounds',
    );
    const salt = bcrypt.genSaltSync(bcryptSaltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
