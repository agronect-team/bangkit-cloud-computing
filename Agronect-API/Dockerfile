FROM node:20.3.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD npm start