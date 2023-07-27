FROM node:14

WORKDIR /app

COPY ./billing-service/package*.json ./
RUN npm install

COPY ./billing-service .

COPY ./lib /app/lib
RUN cd /app/lib && npm install

EXPOSE 3005

CMD ["node", "server.js"]
