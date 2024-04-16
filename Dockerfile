FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

EXPOSE 5051

CMD ["npm", "start"]
