FROM node:14
RUN mkdir -p /usr/src/app/tmp/uploads
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD npm start