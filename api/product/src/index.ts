import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source';
import ProductResolver from './resolvers/product.resolvers';
import { DataImportService } from './services/DataImportService';

const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();

  console.info('✅ Database initialized');

  if (process.env.NODE_ENV === 'development') {
    const importService = new DataImportService();
    await importService.importData();
    console.info('✅ Development data imported successfully');
  }

  const schema = await buildSchema({
    resolvers: [ProductResolver]
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
