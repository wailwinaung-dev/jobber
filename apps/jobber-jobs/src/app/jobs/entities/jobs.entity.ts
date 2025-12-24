import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobsEntity {
  @Field()
  name: string;

  @Field()
  description: string;
}
