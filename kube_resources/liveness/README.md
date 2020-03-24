## Liveness/Readiness test

Using container: https://github.com/kubernetes/kubernetes/blob/master/test/images/agnhost/liveness/server.go

which answers 200 on the health check only for the first 10 secs.
