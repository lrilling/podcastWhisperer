FROM node:latest

WORKDIR /app

RUN npm install http-server

COPY ./dist .

COPY package*.json /app/

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]
# CMD [ "bash" ]