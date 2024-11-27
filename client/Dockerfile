FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

COPY index.html index.html

EXPOSE 5173

CMD ["npm", "run", "dev"]
