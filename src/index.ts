import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';

import path from 'path';
import { RecipeResolver } from './resolvers/recipe-resolver';
import { Recipe } from './entities/recipe';
import { Rate } from './entities/rate';
import { seedDatabase } from './utils/seed-db';
import { Context } from './resolvers/types/context';
import { User } from './entities/user';

TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    const dbOptions: TypeORM.ConnectionOptions = {
      type: 'sqlite',
      database: `${path.join(__dirname, 'db')}/db.sqlite`,
      entities: [Recipe, Rate, User],
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      dropSchema: true,
      cache: true,
    };

    // create TypeORM connection
    await TypeORM.createConnection(dbOptions);

    // seed database with some data
    const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [RecipeResolver],
      container: Container,
    });

    // create mocked context
    const context: Context = { user: defaultUser };

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context,
      playground: {
        endpoint: '/graphql',
      },
    });

    // Start the server
    const { url } = await server.listen(4000);
    console.info(`Server is running ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();