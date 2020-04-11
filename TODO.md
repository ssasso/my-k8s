# TO-DO

* [x] Integrated vSphere Persistent Volumes
* [x] Test Auto Scaling
* [x] Simple Network Policy
* [x] Basic container health / liveness check
* [x] Jobs and Crons
* [x] Init containers
* [x] MetalLB Layer 2 and BGP integration
    * [x] ECMP ingress routing
* [ ] Sidecar containers
* [ ] Secrets (i.e. https://kubernetesbyexample.com/secrets/ )
* [x] re-deploy cluster, and write steps also for installing ingress (and check docker params)
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
* [ ] Kong ingress
* [ ] Health check from Ingress (??)
* [ ] Read more about Calico (and Kubespray config for it)
    * [ ] keep in mind integration with MetalLB
* [ ] Read and try existing "Operators":
    * [ ] MongoDB replicaset
    * [ ] MySQL Cluster
    * [ ] PostgreSQL Cluster
    * [ ] ElasticSearch
    * [ ] KubeDB Operators
* [x] HELM
* [x] KIND mini cluster
* [ ] Kustomize
* [x] Multus CNI
* [ ] Cilium CNI
* [ ] Nokia DANM CNI
* [ ] Envoy Ingress
* [ ] KubeVirt / KubeEdge
* [ ] K8S and VRF segmentation
* [ ] Cluster with multiple overlay/underlay
* [ ] Geo clustering, clustering interconnect (federation?)
* [ ] K8S and EVPN
* [ ] Use of IPVLAN and MACVLAN with Multus
* [x] Kubeless Serverless framework
* [ ] Custom External Load Balancer (example: F5)a
* [ ] AWS: deploy EKS with CFN
* [ ] AWS: deploy K8S with Kops, and try Lyft cni-ipvlan-vpc-k8s

