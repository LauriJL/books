FROM node:17.3-alpine

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install cors


COPY . .

CMD ["npm", "start"]