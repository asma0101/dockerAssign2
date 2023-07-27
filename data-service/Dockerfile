FROM node:14

WORKDIR /app

COPY ./data-service/package*.json ./
RUN npm install

COPY ./data-service .

COPY ./lib /app/lib
RUN cd /app/lib && npm install

EXPOSE 5009

CMD ["node", "server.js"]
