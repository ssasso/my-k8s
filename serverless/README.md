# Serverless with Kubeless

## Installation
* Follow: https://kubeless.io/docs/quick-start/
* Download local binary from: https://github.com/kubeless/kubeless/releases/download/v1.0.6/kubeless_linux-amd64.zip
* Install in into `/usr/local/bin`
* Create Kubernetes resources:
```
kubectl create ns kubeless
kubectl create -f https://github.com/kubeless/kubeless/releases/download/v1.0.6/kubeless-v1.0.6.yaml 
```
* Verify deployment:
```
kubectl get pods -n kubeless
kubectl get deployment -n kubeless
kubectl get customresourcedefinition
```

## Testing with sample function
```
kubeless function deploy hello --runtime python2.7 \
                                --from-file test.py \
                                --handler test.hello
```
Verify:
```
$ kubectl get functions
NAME         AGE
hello        1h

$ kubeless function ls
NAME            NAMESPACE   HANDLER       RUNTIME   DEPENDENCIES    STATUS
hello           default     helloget.foo  python2.7                 1/1 READY
```
And call it:
```
$ kubeless function call hello --data 'Hello world!'
Hello world!
```

## Calling from outside
Kubeless leverages Kubernetes ingress to provide routing for functions. You can use NGINX or Kong Ingress Controllers.
(use Kong to secure them)

Deploy a new function with an http trigger:
```
$ kubeless function deploy get-python \
                    --runtime python2.7 \
                    --handler helloget.foo \
                    --from-file helloget.py
$ kubeless trigger http create get-python --function-name get-python --path echo --hostname echo.172.23.133.0.xip.io
$ kubectl get ingress
```
Test it:
```
$ curl --data '{"Another": "Echo"}' http://echo.172.23.133.0.xip.io/echo && echo
{"Another": "Echo"}
```
