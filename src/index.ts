import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import { seedDatabase } from './utils/seed-db';
import { Context } from './resolvers/types/context';
import { createSchema } from './utils/app-utils';

TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    const dbOptions: TypeORM.ConnectionOptions = {
      type: 'sqlite',
      database: `${path.join(__dirname, '../', 'db')}/db.sqlite`,
      entities: ['src/entities/*'],
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      dropSchema: false,
      cache: true,
    };

    await TypeORM.createConnection(dbOptions);

    const { defaultUser } = await seedDatabase();

    const schema = await createSchema();

    const context: Context = { user: defaultUser };

    const server = new ApolloServer({
      schema,
      context,
      playground: {
        endpoint: '/graphql',
      },
    });

    const { url } = await server.listen(4000);
    console.info(`Server is running ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
