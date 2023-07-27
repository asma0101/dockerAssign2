FROM node:14

WORKDIR /app

COPY ./shipping-service/package*.json ./
RUN npm install

COPY ./shipping-service .

COPY ./lib /app/lib
RUN cd /app/lib && npm install

CMD ["node", "server.js"]

EXPOSE 3008