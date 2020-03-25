# Auto Scaling test

Use of HPA (Horizontal Pod Autoscaler) with a webserver returning fibonacci number.

**WARN**: metrics server shall be enabled. (I've had some problems deploying metrics on existing cluster, I had to edit the deployment, using `hostNetwork: true` on Pod spec, and `--kubelet-insecure-tls` as additional container param)

Can be tested directly from your host, since the service is exposed via `LoadBalancer`:
```
while true; do curl --connect-timeout 1 http://172.23.133.2:3000/fibonacci/30; echo; done
```

As result, you can see:
```
$ kubectl describe hpa fibonacci-hpa
Name:                                                  fibonacci-hpa
Namespace:                                             default
Labels:                                                <none>
Annotations:                                           kubectl.kubernetes.io/last-applied-configuration:
                                                         {"apiVersion":"autoscaling/v2beta2","kind":"HorizontalPodAutoscaler","metadata":{"annotations":{},"name":"fibonacci-hpa","namespace":"defa...
CreationTimestamp:                                     Wed, 25 Mar 2020 10:26:26 +0000
Reference:                                             Deployment/fibonacci
Metrics:                                               ( current / target )
  resource cpu on pods  (as a percentage of request):  0% (0) / 10%
Min replicas:                                          2
Max replicas:                                          8
Deployment pods:                                       2 current / 2 desired
Conditions:
  Type            Status  Reason            Message
  ----            ------  ------            -------
  AbleToScale     True    ReadyForNewScale  recommended size matches current size
  ScalingActive   True    ValidMetricFound  the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
  ScalingLimited  True    TooFewReplicas    the desired replica count is less than the minimum replica count
Events:
  Type    Reason             Age    From                       Message
  ----    ------             ----   ----                       -------
  Normal  SuccessfulRescale  20m    horizontal-pod-autoscaler  New size: 4; reason: cpu resource utilization (percentage of request) above target
  Normal  SuccessfulRescale  17m    horizontal-pod-autoscaler  New size: 7; reason: cpu resource utilization (percentage of request) above target
  Normal  SuccessfulRescale  15m    horizontal-pod-autoscaler  New size: 8; reason: cpu resource utilization (percentage of request) above target
  Normal  SuccessfulRescale  9m28s  horizontal-pod-autoscaler  New size: 4; reason: All metrics below target
  Normal  SuccessfulRescale  7m27s  horizontal-pod-autoscaler  New size: 2; reason: All metrics below target
```
