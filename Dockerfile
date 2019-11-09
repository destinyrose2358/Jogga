FROM node:12.13.0-alpine

COPY . /app

WORKDIR /app

ENV NODE_ENV=production

RUN npm install --silent \
  && npm run client-install --silent \
  && npm rebuild node-sass --prefix client \
  && npm run build --prefix client
  
EXPOSE 5000/tcp

CMD ["npm", "start"]