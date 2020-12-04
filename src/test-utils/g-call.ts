import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { createSchema } from '../utils/app-utils';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

export const gCall = async ({ source }: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
  });
};
