# VM instantiation

After template creation (follow info in `terraform_vm_deploy` directory), create the cluster with:
```
$ terraform init
$ terraform plan
$ terraform apply
```

Verify the resources has been created on vSphere.
Create a directory `kubevols` in your datastore.

# Cluster configuration

Verify cluster config in `kubespray_config` directory, especially `inventory.ini`.

Clone kubespray repo ( https://github.com/kubernetes-sigs/kubespray ) and copy config dir into `inventory`.

Then run:
```
ansible-playbook -i inventory/stk8/inventory.ini  --become --become-user=root cluster.yml
```

After installation, you can use generated `admin.conf` file to connect to the cluster. Just copy it to `~/.kube/config`.

Verify with: `kubectl get nodes`.

NOTE: after the configuration, `dockerd`, even if started with `--bridge=none --iptables=false`, did not clean up the iptables rules.
Hence, this rule can cause problems with Source IP preservation (with the kube-proxy ipvs mode):
```
-t nat -A POSTROUTING -s 172.17.0.0/16 ! -o docker0 -j MASQUERADE
```
Manual cleanup or reboot will solve this.

Now we have a cluster with Multus and Calico. But we need to install MetalLB.
```
kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/metallb.yaml
# On first install only
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
```
Apply then our custom config:
```
kubectl apply -f kube_resources/metallb/metal-config.yaml
```

And verify the BGP peering is up:
```
vyos@vyos:~$ sh ip bgp summary

IPv4 Unicast Summary:
BGP router identifier 172.23.132.1, local AS number 501 vrf-id 0
BGP table version 36
RIB entries 1, using 184 bytes of memory
Peers 4, using 82 KiB of memory
Peer groups 1, using 64 bytes of memory

Neighbor        V         AS MsgRcvd MsgSent   TblVer  InQ OutQ  Up/Down State/PfxRcd
172.23.132.101  4        502   27113   27124        0    0    0 00:00:34            0
172.23.132.102  4        502   27114   27124        0    0    0 00:00:34            0
172.23.132.103  4        502   27108   27120        0    0    0 00:00:34            0
172.23.132.104  4        502    9914    9922        0    0    0 00:00:34            0

Total number of neighbors 4
```
