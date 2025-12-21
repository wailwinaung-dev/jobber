import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email field (example@mail.com)' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Password field' })
  @IsStrongPassword()
  password: string;
}
