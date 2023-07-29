FROM node:20.4.0-alpine3.18 as builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --only=production
COPY . /app
ARG INVOICE_DATA_API_URL
ARG INVOICE_DATA_API_TOKEN 
ARG BACKEND_URL
ENV VITE_GET_INVOICE_DATA_URL=$INVOICE_DATA_API_URL
ENV VITE_GET_INVOICE_DATA_TOKEN=$INVOICE_DATA_API_TOKEN
ENV VITE_API_URL=$BACKEND_URL
RUN npm run build

FROM nginx:1.25.1-alpine3.17-slim as production
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 443
