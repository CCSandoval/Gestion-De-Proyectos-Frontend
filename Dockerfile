FROM node:14

WORKDIR /front

COPY package.json ./

COPY yarn.lock ./

COPY ./ ./

RUN yarn install

CMD ["yarn", "start"]
