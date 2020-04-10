#!/bin/ash

h=$(hostname)

echo "HELLO THERE!"
echo
echo "You can enter this console with:"
echo "  $ kubectl exec -it ${h} -- /bin/bash"
echo 

while true; do sleep 600; done;

