import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source';
import ProductResolver from './resolvers/product.resolvers';

const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [ProductResolver]
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
