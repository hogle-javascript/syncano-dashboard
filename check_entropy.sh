#!/bin/bash

while true;
do
  cat /proc/sys/kernel/random/entropy_avail
  sleep 15
done
