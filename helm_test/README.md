# Install & init helm:

## Service Account
```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
```

## init
```
helm init --service-account=tiller
```

## example run
```
$ helm install --dry-run --debug ./zoo
$ helm install -n beasty ./zoo
NAME:   beasty
LAST DEPLOYED: Sun Apr  5 14:08:26 2020
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/Deployment
NAME        READY  UP-TO-DATE  AVAILABLE  AGE
beasty-zoo  0/7    0           0          1s

==> v1/Pod(related)
NAME                         READY  STATUS             RESTARTS  AGE
beasty-zoo-7d4b5fcd6c-fp5mv  0/1    ContainerCreating  0         0s
beasty-zoo-7d4b5fcd6c-gz4l2  0/1    Pending            0         0s
beasty-zoo-7d4b5fcd6c-hrssn  0/1    Pending            0         0s
beasty-zoo-7d4b5fcd6c-lnksq  0/1    ContainerCreating  0         0s
beasty-zoo-7d4b5fcd6c-tltr4  0/1    ContainerCreating  0         0s
beasty-zoo-7d4b5fcd6c-tmvvn  0/1    ContainerCreating  0         0s
beasty-zoo-7d4b5fcd6c-wzdk7  0/1    ContainerCreating  0         1s

==> v1/Service
NAME        TYPE       CLUSTER-IP      EXTERNAL-IP  PORT(S)   AGE
beasty-zoo  ClusterIP  10.248.218.120  <none>       8080/TCP  1s

==> v1beta1/Ingress
NAME        HOSTS                    ADDRESS  PORTS  AGE
beasty-zoo  zoo.172.23.133.0.xip.io  80       1s


NOTES:
You can reach the WebApp at: http://zoo.172.23.133.0.xip.io

```
