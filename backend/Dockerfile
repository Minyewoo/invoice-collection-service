FROM node:20.4.0-alpine3.18
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --only=production
COPY . /app
EXPOSE 8080
CMD ["npm", "run", "start"]
