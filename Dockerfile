FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm start