import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.interface';
import { Public } from './guard/gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponse)
  async logIn(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.logIn(loginInput);
  }
}
