#!/bin/bash

while true;
do
  echo -n "Entropy available: " && cat /proc/sys/kernel/random/entropy_avail
  echo -n "Ram usage: " && free | grep Mem | awk '{print $3/$2 * 100.0"%"}'
  echo -n "CPU usage: " && top -bn1 | grep "Cpu(s)" | \
                 sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | \
                 awk '{print 100 - $1"%"}'
  echo "======================================================="
  echo ""
  sleep 5
done
