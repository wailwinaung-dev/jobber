import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '@jobber/nestjs';

@ObjectType()
export class User extends AbstractEntity {
  @Field(() => String, { description: 'Email field (example@mail.com)' })
  email: string;
}
