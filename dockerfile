FROM node:14-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package.json .

USER node

RUN npm install
COPY public public
COPY views views
COPY dist dist
COPY .env .

EXPOSE 12000

CMD [ "node", "dist/main.js" ]