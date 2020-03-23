#!/bin/bash

KEY_FILE=simple.key
CERT_FILE=simple.crt
HOST=simple.172.23.133.1.xip.io
CERT_NAME=simple

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ${KEY_FILE} -out ${CERT_FILE} -subj "/CN=${HOST}/O=${HOST}"

kubectl create secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE}

