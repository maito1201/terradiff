FROM node:15.2.1-alpine
WORKDIR /myapp
COPY package.json ./
RUN npm install && npm install -g @vue/cli

