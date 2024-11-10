FROM node:21.6.1

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /client

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .
EXPOSE 3000

# build the nextjs app
RUN npm run build

# run the built app
CMD ["npm", "run", "start"]