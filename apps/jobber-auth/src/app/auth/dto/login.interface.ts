import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType() // <--- Crucial: Tells GraphQL this is a returnable object
export class LoginResponse {
  @Field()
  access_token: string;

  @Field() // <--- GraphQL will map this to DateTime automatically
  expiresAt: Date;

  @Field(() => User) // <--- Explicitly tell GraphQL this field returns a User object
  user: User;
}

export interface JwtPayload {
  id: number;
  email: string;
}
