FROM node:22.11

ENV NODE_ENV=production

WORKDIR /api

# Need to install python3 and build-essential before installing serialport via npm
RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

# node_modules is in dockerignore file
COPY . .

# port used for api
EXPOSE 3001

CMD npm run start