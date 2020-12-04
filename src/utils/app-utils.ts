import { Container } from 'typedi';
import path from 'path';
import * as TypeGraphQL from 'type-graphql';

export const createSchema = async () => {
  const schema = await TypeGraphQL.buildSchema({
    resolvers: [path.join(__dirname, '../', 'resolvers', '/**/*resolver.ts')],
    container: Container,
  });
  return schema;
};
