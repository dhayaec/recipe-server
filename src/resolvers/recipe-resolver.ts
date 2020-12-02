import { Resolver, Query, Arg, Mutation, Ctx, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Recipe } from '../entities/recipe';
import { Rate } from '../entities/rate';
import { RecipeInput } from './types/recipe-input';
import { RateInput } from './types/rate-input';
import { Context } from './types/context';

@Resolver(Recipe)
export class RecipeResolver {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Rate)
    private readonly ratingsRepository: Repository<Rate>, // eslint-disable-next-line no-empty-function
  ) {}

  @Query(() => Recipe, { nullable: true })
  recipe(@Arg('recipeId', () => Int) recipeId: number) {
    return this.recipeRepository.findOne(recipeId);
  }

  @Query(() => [Recipe])
  recipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: ['author', 'ratings'],
    });
  }

  @Mutation(() => Recipe)
  addRecipe(
    @Arg('recipe') recipeInput: RecipeInput,
    @Ctx() { user }: Context,
  ): Promise<Recipe> {
    const recipe = this.recipeRepository.create({
      ...recipeInput,
      author: user,
    });
    return this.recipeRepository.save(recipe);
  }

  @Mutation(() => Recipe)
  async rate(
    @Ctx() { user }: Context,
    @Arg('rate') rateInput: RateInput,
  ): Promise<Recipe> {
    // find the recipe
    const recipe = await this.recipeRepository.findOne(rateInput.recipeId, {
      relations: ['ratings'], // preload the relation as we will modify it
    });
    if (!recipe) {
      throw new Error('Invalid recipe ID');
    }

    // add the new recipe rate
    (await recipe.ratings).push(
      this.ratingsRepository.create({
        recipe,
        user,
        value: rateInput.value,
      }),
    );

    return this.recipeRepository.save(recipe);
  }
}
