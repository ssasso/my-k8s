FROM alpine:3.8

RUN apk add --no-cache ruby-webrick ruby-etc
COPY randserver /usr/local/bin
ENTRYPOINT ["/usr/local/bin/randserver"]
