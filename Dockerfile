
FROM node:16-alpine as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
RUN apk -U upgrade && apk add netcat-openbsd
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=development /app/dist/ ./dist/
