## randserver

Simple WebServer used for testing persistent volumes.

On startup, it creates a temporary file on the datadir.

Re-starting the Pod multiple times, if attached to a persistent volume, will result in multiple files displayed by the webserver
