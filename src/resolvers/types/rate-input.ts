import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class RateInput {
  @Field(() => ID)
  recipeId: string;

  @Field(() => Int)
  value: number;
}
