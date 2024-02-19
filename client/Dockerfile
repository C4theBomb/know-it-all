FROM node:16-alpine as build
WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

RUN npm run build


FROM node:16-alpine
WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000/tcp

CMD ["npx", "serve", "-s", "build"]
