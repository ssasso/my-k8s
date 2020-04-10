FROM alpine

RUN apk add bash curl busybox-extras bind-tools

ADD run.sh /tmp/run.sh
RUN chmod +x /tmp/run.sh
ENTRYPOINT ["/tmp/run.sh"]

