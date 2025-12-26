import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import * as argon2 from 'argon2';
import { JwtPayload } from './dto/login.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async logIn(loginInput: LoginInput) {
    const user = await this.verifyUser(loginInput);
    const payload: JwtPayload = { id: user.id, email: user.email };

    const expiresAt = new Date();
    const expirationStr =
      this.configService.getOrThrow<string>('JWT_EXPIRATION');
    const expirationSeconds = parseInt(expirationStr);
    expiresAt.setMilliseconds(
      expiresAt.getMilliseconds() + expirationSeconds * 1000
    );
    return {
      access_token: await this.jwtService.signAsync(payload),
      expiresAt,
      user,
    };
  }

  async verifyUser(payload: LoginInput) {
    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await argon2.verify(user.password, payload.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async validateUser(payload: JwtPayload) {
    return this.usersService.findOne(payload.id);
  }
}
