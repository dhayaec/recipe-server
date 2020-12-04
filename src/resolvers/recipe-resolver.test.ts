import { Connection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import { gql } from 'apollo-server';
import { print } from 'graphql';
import { gCall } from '../test-utils/g-call';
import { testConn } from '../test-utils/test-conn';

let conn: Connection;
beforeAll(async () => {
  useContainer(Container);
  conn = await testConn();
});

afterAll(async () => {
  conn.close();
});

describe('recipe-resolver tests', () => {
  it('gets recipes', async () => {
    const recipesQuery = gql`
      {
        recipes {
          id
          title
          description
          author {
            id
            nickname
            email
          }
        }
      }
    `;
    const res = await gCall({ source: print(recipesQuery) });
    expect(res.data?.recipes.length).toEqual(0);
  });
});
