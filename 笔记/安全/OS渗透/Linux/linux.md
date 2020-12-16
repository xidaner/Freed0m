# Linux

## 查看是否是虚拟机
lshw -class system | grep -i VM & grep -i virtual
dmesg | grep -i VM & grep -i virtual
dmidecode -s system-product-name
ls /tmp
systemd-detect-virt
virt-what
ls -alh /.dockerenv
cat /proc/1/cgroup
