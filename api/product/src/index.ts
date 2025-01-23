import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source';
import getSchema from './schema';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'type-graphql';
import { parse } from 'cookie';
import redisClient from './redis.config';

const { PORT, ACCESS_TOKEN_SECRET } = process.env;

interface User {
  email: string;
  role: string;
}

interface Context {
  user: User | null;
}

(async () => {
  await AppDataSource.initialize();
  await redisClient.connect();
  console.info('🚀 Redis connected');

  const schema = await getSchema();

  const server = new ApolloServer<Context>({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req }: { req: import('http').IncomingMessage }) => {
      const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
      const accessToken = cookies.access_token;

      if (!accessToken) {
        throw new AuthenticationError("Le token d'accès est manquant.");
      }

      let user: User | null = null;

      if (accessToken) {
        try {
          user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string) as User;

          if (user.role !== 'user') {
            throw new AuthenticationError(
              "Vous n'êtes pas autorisé à accéder à cette ressource."
            );
          }
        } catch (err) {
          console.error('JWT invalide : ', err);
          throw new AuthenticationError(
            "Token d'accès invalide ou expiré. Veuillez vous reconnecter."
          );
        }
      }

      return { user };
    }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
