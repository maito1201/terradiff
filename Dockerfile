FROM node:15.2.1-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install && yarn global add @vue/cli

