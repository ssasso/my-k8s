
# vCenter IP or FQDN #
vsphere_vcenter = "172.23.128.10"

# vSphere username used to deploy the infrastructure #
vsphere_user = "Administrator@vsphere.local"

# Skip the verification of the vCenter SSL certificate (true/false) #
vsphere_unverified_ssl = "true"

# vSphere datacenter name where the infrastructure will be deployed #
vsphere_datacenter = "Datacenter"

# vSphere cluster name where the infrastructure will be deployed #
vsphere_drs_cluster = "Cluster"

# vSphere resource pool name that will be created to deploy the virtual machines #
vsphere_resource_pool = "K8S"

# vSphere username used by the vSphere cloud provider #
vsphere_vcp_user = "Administrator@vsphere.local"

# vSphere datastore name where the Kubernetes persistant volumes will be created #
vsphere_vcp_datastore = "ds01"

# The prefix to add to the names of the virtual machines #
vm_name_prefix = "k8s"

# The name of the vSphere virtual machine and template folder that will be created to store the virtual machines #
vm_folder = "K8S"

# The datastore name used to store the files of the virtual machines #
vm_datastore = "ds01"

# The vSphere network name used by the virtual machines #
vm_network = "pg132"

# The netmask used to configure the network cards of the virtual machines (example: 24)#
vm_netmask = "24"

# The network gateway used by the virtual machines #
vm_gateway = "172.23.132.1"

# The DNS server used by the virtual machines #
vm_dns = "172.23.132.1"

# The domain name used by the virtual machines #
vm_domain = "stk8.network"

# The vSphere template the virtual machine are based on #
vm_template = "terraform-template/TEMPLATE_UBUNTU"

# Use linked clone (true/false)
vm_linked_clone = "false"

#===============================================================================
# Master node virtual machines parameters
#===============================================================================

# The number of vCPU allocated to the master virtual machines #
vm_master_cpu = "2"

# The amount of RAM allocated to the master virtual machines #
vm_master_ram = "2048"

# The IP addresses of the master virtual machines. You need to define 3 IPs for the masters #
vm_master_ips = {
  "0" = "172.23.132.11"
  "1" = "172.23.132.12"
  "2" = "172.23.132.13"
}

#===============================================================================
# Worker node virtual machines parameters
#===============================================================================

# The number of vCPU allocated to the worker virtual machines #
vm_worker_cpu = "4"

# The amount of RAM allocated to the worker virtual machines #
vm_worker_ram = "4096"

# The IP addresses of the master virtual machines. You need to define 1 IP or more for the workers #
vm_worker_ips = {
  "0" = "172.23.132.101"
  "1" = "172.23.132.102"
  "2" = "172.23.132.103"
  "3" = "172.23.132.104"
}

vsphere_password = "Admin123!"
vsphere_vcp_password = "Admin123!"

