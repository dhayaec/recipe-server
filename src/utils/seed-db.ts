import { getRepository } from 'typeorm';
import casual from 'casual';
import { Rate } from '../entities/rate';
import { Recipe } from '../entities/recipe';
import { User } from '../entities/user';

export async function seedDatabase() {
  const recipeRepository = getRepository(Recipe);
  const ratingsRepository = getRepository(Rate);
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: casual.email,
    nickname: casual.name,
    password: '123456',
  });
  await userRepository.save(defaultUser);

  const [recipe1, recipe2] = recipeRepository.create([
    {
      title: casual.color_name,
      description: casual.short_description,
      author: defaultUser,
    },
    {
      title: casual.color_name,
      description: casual.short_description,
      author: defaultUser,
    },
  ]);
  await recipeRepository.save([recipe1, recipe2]);

  const ratings = ratingsRepository.create([
    { value: 2, user: defaultUser, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },
    { value: 5, user: defaultUser, recipe: recipe1 },
    { value: 3, user: defaultUser, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },

    { value: 2, user: defaultUser, recipe: recipe2 },
    { value: 4, user: defaultUser, recipe: recipe2 },
  ]);
  await ratingsRepository.save(ratings);

  return {
    defaultUser,
  };
}

export type Lazy<T extends object> = Promise<T> | T;
