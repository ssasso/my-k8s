# TO-DO

* [x] Integrated vSphere Persistent Volumes
* [x] Test Auto Scaling
* [x] Simple Network Policy
* [x] Basic container health / liveness check
* [ ] Jobs and Crons ( https://kubernetesbyexample.com/jobs/ )
* [ ] Sidecar and Init containers ( https://kubernetesbyexample.com/ic/ )
* [ ] Secrets (i.e. https://kubernetesbyexample.com/secrets/ )
* [ ] re-deploy cluster, and write steps also for installing ingress (and check docker params)
* [ ] re-deploy cluster, using HAProxy as API load balancer (see: https://github.com/sguyennet/terraform-vsphere-kubespray )
* [ ] worker down detector
* [ ] verify ingress HA and real load balancing / service ECMP routes for `Local` only kind of service
* [ ] verify ingress autoscaling
* [ ] check differences between community and official nginx ingress
    * https://github.com/nginxinc/kubernetes-ingress/
    * https://github.com/kubernetes/ingress-nginx/
    * https://github.com/nginxinc/kubernetes-ingress/blob/master/docs/nginx-ingress-controllers.md
* [ ] Traefik ingress
* [ ] HAProxy ingress
* [ ] Health check from Ingress (??)
* [ ] Read more about Calico (and Kubespray config for it)
    * [ ] keep in mind integration with MetalLB
* [ ] Read and try existing "Operators":
    * [ ] MongoDB replicaset
    * [ ] MySQL Cluster
    * [ ] PostgreSQL Cluster
    * [ ] ElasticSearch
* [ ] HELM
* [ ] Kustomize
