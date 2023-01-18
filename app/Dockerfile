FROM node:latest

# Installing "libcurl4" because some Debian images may not come with this package installed, but is required by the mongodb binaries
RUN apt-get install libcurl4

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g gulp

RUN npm run build-for-docker

CMD ["node", "dist/index.js"]