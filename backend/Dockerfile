FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY ./pnpm-workspace.yaml ./
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

COPY ./backend ./backend
COPY ./shared ./shared

RUN pnpm --filter backend install

RUN pnpm --filter backend build

RUN pnpm --filter backend exec playwright install --with-deps chromium

EXPOSE 3000
CMD ["pnpm", "--filter", "backend", "run", "start:prod"]
