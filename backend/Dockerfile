FROM rust:1.67.1-alpine3.17 as builder
RUN apk add --no-cache libc-dev
COPY Cargo.toml /build/
COPY ./src/ /build/src/
WORKDIR /build
RUN USER=root cargo build --release

FROM alpine:3.17
COPY --from=builder /build/target/release/invoice-collection-service /app/
WORKDIR /app
EXPOSE 8080
CMD ["/app/invoice-collection-service"]
