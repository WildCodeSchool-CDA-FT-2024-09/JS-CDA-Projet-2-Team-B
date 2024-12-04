import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source';
import getSchema from './schema';

const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();

  const schema = await getSchema();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
