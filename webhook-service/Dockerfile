FROM node:14

WORKDIR /app

COPY ./webhook-service/package*.json ./
RUN npm install

COPY ./webhook-service .

COPY ./lib /app/lib
RUN cd /app/lib && npm install

EXPOSE 5008

CMD ["node", "server.js"]
