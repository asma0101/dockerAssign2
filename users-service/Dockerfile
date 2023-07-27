FROM node:14

WORKDIR /app

COPY ./users-service/package*.json ./
RUN npm install

COPY ./users-service .

COPY ./lib /app/lib
RUN cd /app/lib && npm install

EXPOSE 3009

CMD ["node", "server.js"]
