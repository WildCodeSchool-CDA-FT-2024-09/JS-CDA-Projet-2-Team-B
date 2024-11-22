import * as dotenv from 'dotenv';
import { buildSchema, Resolver } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
//import { dataSource } from "./db/db-client";
import { startStandaloneServer } from '@apollo/server/standalone';
import { DataSource } from 'typeorm';

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST, PORT } =
  process.env;

const testDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [],
  synchronize: true,
  logging: false
});

@Resolver()
class HelloResolver {
  hello() {
    return 'Hello World';
  }
}

(async () => {
  try {
    console.info('Initializing data source...');
    await testDataSource.initialize();
    console.info('Data source initialized.');
    const schema = await buildSchema({
      resolvers: [HelloResolver]
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(PORT) }
    });

    console.info(`🚀Server is online, ready to go 🚀 at:${url}`);
  } catch (error) {
    console.error('Error starting server', error);
  }
})();
