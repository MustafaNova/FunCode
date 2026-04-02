FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY backend/package.json backend/pnpm-lock.yaml ./
COPY ./shared ../shared

RUN pnpm install

COPY ./backend .

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start:dev"]
