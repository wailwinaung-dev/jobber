import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from '@jobber/protos';
import { Controller, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/login.interface';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService
  ) {}
  async authenticate(request: AuthenticateRequest): Promise<User> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        request.token,
        {
          secret: this.configService.get('JWT_SECRET'),
        }
      );

      const user = await this.authService.validateUser(payload);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        id: payload.id,
        email: payload.email,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
