FROM node:11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "npm", "start" ]
