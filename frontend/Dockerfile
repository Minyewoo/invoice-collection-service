FROM node:20.4.0-alpine3.18 as builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --only=production
COPY . /app
RUN npm run build

FROM nginx:1.25.1-alpine3.17-slim as production
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
COPY ./ssl /etc/nginx/ssl
EXPOSE 443
