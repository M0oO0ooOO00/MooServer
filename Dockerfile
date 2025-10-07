FROM node:20 AS builder
LABEL maintainer="homerunies"

RUN npm install -g pnpm

FROM builder as deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm build

FROM node:20-slim AS runner
LABEL maintainer="homerunies"
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist

EXPOSE 3030

CMD [ "node", "dist/main.js" ]
