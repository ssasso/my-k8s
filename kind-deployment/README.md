# KIND Cluster deployment

In addition to vmware and kubespray, I am trying a small cluster using KIND, Kubernetes-IN-Docker.
This won't have all the capabilities of the other (i.e. decent networking, persistent storage, ...), but can be useful to test applications.

## OS Preparation:

Ubuntu 18.04 LTS, plus:
```
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common \
    jq

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

apt-get install -y docker-ce docker-ce-cli containerd.io

curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.7.0/kind-$(uname)-amd64 \
  && chmod +x ./kind && mv kind /usr/local/bin/

curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.17.2/bin/linux/amd64/kubectl \
  && chmod +x ./kubectl && mv kubectl /usr/local/bin/

# https://kind.sigs.k8s.io/docs/user/known-issues/#pod-errors-due-to-too-many-open-files
echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.d/90-inotify.conf
echo "fs.inotify.max_user_instances=1024" >> /etc/sysctl.d/90-inotify.conf
sysctl --load /etc/sysctl.d/90-inotify.conf
```
Remember to change default docker networking (`/etc/docker/daemon.json`):
```
{
  "bip": "10.247.0.1/20",
  "fixed-cidr": "10.247.0.0/22"
}
```

## Create cluster
```
kind create cluster --name k-1 --config kind-conf.yaml
```

## Verify cluster and install addons
```
kubectl get nodes
kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/metallb.yaml
# On first install only
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
kubectl apply -f kind-metal.yaml
```

## Test cluster
```
kubectl apply -f app/animal-deploy.yaml
kubectl apply -f app/animal-service.yaml
kubectl get pod
kubectl get service
```

## Ingress
If needed, you can install `nginx` ingress controller:
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
kubectl apply -f ingress-service-lb.yaml
kubectl apply -f app/animal-ingress.yaml
```
Be careful: with MetalLB in Layer 2 mode, with this specific configuration you won't have the source IP preserved.

You can test it with a fake name resolution:
```
curl --resolve animal.app:80:10.247.8.2 http://animal.app
```

