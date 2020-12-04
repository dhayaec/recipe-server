import { createConnection } from 'typeorm';
import path from 'path';

export const testConn = (drop = false) => {
  return createConnection({
    type: 'sqlite',
    database: `${path.join(__dirname, '../', '../', 'db')}/test.sqlite`,
    entities: ['src/entities/*.*'],
    synchronize: drop,
    dropSchema: drop,
    cache: false,
  });
};
