FROM rust:1.67.1-alpine3.17 as builder
WORKDIR /build
RUN apk add --no-cache libc-dev
COPY . .
RUN cargo build --release

FROM alpine:3.17
WORKDIR /app
COPY --from=builder /build/target/release/invoice-collection-service /app
EXPOSE 8080
CMD [ "/app/invoice-collection-service" ]
