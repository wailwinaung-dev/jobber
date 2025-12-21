import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class AbstractEntity {
  @Field(() => ID)
  id: number;
}
