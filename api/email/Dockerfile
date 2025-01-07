FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY src src

COPY tests tests

COPY jest.config.ts jest.config.ts

EXPOSE 8000

CMD ["npm", "run", "dev"]