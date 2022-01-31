FROM node:lts

COPY . /app
WORKDIR /app

RUN mkdir -p private
RUN openssl rand -out ./private/auth.key -base64 1024

RUN npm install
RUN npm run build

CMD [ "node", "./dist/index.js" ]
