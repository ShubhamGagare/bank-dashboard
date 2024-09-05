FROM node:20-alpine as builder

WORKDIR /app

COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY turbo.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/apps/frontend/package.json ./

RUN npm install --production

EXPOSE 5173

CMD ["npm", "run", "start"]