FROM node:16.17-slim

ENV PORT 3000
EXPOSE $PORT

RUN apt-get update && apt-get install git -y

WORKDIR /app
ADD ./package.json ./package.json
ADD ./package-lock.json ./package-lock.json

RUN npm install
ADD . /app

CMD ["npm", "start"]