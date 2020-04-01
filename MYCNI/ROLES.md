# Create RBAC user/cert for CNI plugin
```
openssl genrsa -out mycni.key 2048
openssl req -new -key mycni.key \
-out mycni.csr \
-subj "/CN=mycni"

openssl x509 -req -in mycni.csr \
-CA /etc/kubernetes/pki/ca.crt \
-CAkey /etc/kubernetes/pki/ca.key \
-CAcreateserial \
-out mycni.crt -days 3650
```
Then (optional) create a KubeConfig:
```
APISERVER=$(kubectl config view -o jsonpath='{.clusters[0].cluster.server}')
kubectl config set-cluster kubernetes \
    --certificate-authority=/etc/kubernetes/pki/ca.crt \
    --embed-certs=true \
    --server=$APISERVER \
    --kubeconfig=cni.kubeconfig

kubectl config set-credentials mycni \
    --client-certificate=mycni.crt \
    --client-key=mycni.key \
    --embed-certs=true \
    --kubeconfig=cni.kubeconfig

kubectl config set-context default \
    --cluster=kubernetes \
    --user=mycni \
    --kubeconfig=cni.kubeconfig

kubectl config use-context default --kubeconfig=cni.kubeconfig
```
Create `ClusterRole` and add binding:
```
kubectl apply -f role.yaml
kubectl create clusterrolebinding mycni --clusterrole=mycni --user=mycni
```
