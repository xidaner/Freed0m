# namp常用代码

https://www.cnblogs.com/bonelee/p/9188122.html

https://www.0dayhack.com/post-820.html

https://blog.csdn.net/m1585761297/article/details/80015726


https://jingyan.baidu.com/article/e75aca853f4abc142edac6f3.html



### 常用代码

nmap信息收集
常用命令
端口扫描
```
-F             端口扫描
-sT            tcp端口扫描  
-sU            udp扫描
-A             综合扫描
-O             系统扫描
-p             指定端口扫描
-T             优化时间1-5强度
-sV            端口对应的服务探测
-sP            发现扫描网络存活主机
-sS            半隐藏式隐蔽扫描
--iL           文件名 导入信
--tr           路由跟踪模式
-P0            (无ping)
-sP            (Ping扫描)
 
--script=vuln  利用脚本漏洞探测
--script=>>>>>>>   调用一个脚本
-oG  nmap.txt  将结果保存到nmap.txt
nmap -T5 -A -v ip地址
```

## 绕过防火墙

### 利用掩体
```
TCP1：nmap -Pn -sS --stats-every 3m --max-scan-delay 20 -T4 -p1-65535 (ip) -oN 路径

    TCP2：nmap -nvv -Pn -sSV -p 端口 --version-intensity 9 -A (ip )-oN 路径

    UDP： nmap -Pn --top-ports 1000 -sU --stats-every 3m -T3 (ip) -oN 路径
```
```
namp -D IP地址1,IP地址2... IP地址
```
你可以使用 `D 选项（英文 decoy）`跟一些 IP 地址，`IP 和 IP `之间用逗号隔开。这样看起来用来侦测而发送的数据包不仅来自于你的 IP 地址，还来自于这些掩体 IP。这就叫做` “混入其中”`。

### 禁用 ping

```
nmap -P0 IP地址
```
该选项和 PN 选项被一起合并到 Pn 选项之中。但是如果你愿意，你仍然可以使用 P0 选项（P 后面跟的是零）。



### IP 地址伪装

```
sudo proxychains nmap ...
```
伪装 IP 地址的方法也有很多，比如你可以使用 prxychains 这款工具来实现匿名代理。

### 指定网卡进行扫描

```
nmap -e 网卡 IP地址
```
当你拥有不止一个网卡的时候，这很有用。


### 限制扫描时间
```
nmap --host-timeout 时间 IP地址
```
限制每个 IP 地址的扫描时间（单位为秒），当要扫描大量的主机 IP 时这很有用。

### 指定源 IP 地址

```
nmap -S 源IP地址 IP地址
```
使用冒充的 IP 地址进行扫描以增强隐蔽性。这里伪装成的 IP 也可以来自于下线状态的主机地址。

### 指定源主机端口

```
nmap -g 53/80 IP地址
```
使用 g 参数，或者 source-port 参数，来手动设定用来扫描的端口。常用的，如 20、53、67 端口。

### 伪装 MAC 地址

```
nmap --spoof-mac 伪造MAC IP地址
```
你可以通过指定供应商的名字来伪装 MAC 地址。可选的名字有 Dell、Apple、3Com。当然也可以手动指定 MAC 地址的值。或者为了简单起见，可以在上面 `“伪造IP”` 的地方填写数字 0，`这将生成一个随机的 MAC 地址。`

### 扫描速度

```
nmap -T0 IP地址
```
T后面跟的数字代表扫描速度，`数字越大则速度越快`。0～5分别表示：`白日梦、悄咪咪、假传正经、正常、有点快哦、妈的傻逼。`

```
-S：可以伪装源地址进行扫描。这样好处在于不会被对方发现自己的真实IP
```


# nmap基本使用方法

## 1、nmap简单扫描

nmap默认发送一个ARP的PING数据包，来探测目标主机1-10000范围内所开放的所有端口

命令语法：
``` 
nmap <target ip address>
```

其中：`target ip address是扫描的目标主机的ip地址`

例子:
```
nmap 10.0.0.55
```
---

## 2、nmap简单扫描，并对结果返回详细的描述输出

命令语法：
```
namp -vv <target ip address>
```
介绍：`-vv参数设置对结果的详细输出`

例子：
```
nmap -vv 10.0.0.55
```
---

## 3、nmap自定义扫描

命令语法：
```
nmap -p(range) <target IP>
```

介绍：
`（range）为要扫描的端口范围，端口大小不能超过65535
`

例子：扫描目标主机的`1-50`号端口

nmap `-p50-80` 10.0.0.55

---

## 4、nmap 指定端口扫描

命令语法：
```
nmap -p(port1,port2,…) <target IP>
```

介绍：
port1,port2…`为想要扫描的端口号`

例子：扫描目标主机的80，443，801端口
```
nmap -p80,443,801 10.0.0.55
```
---

## 5、nmap ping 扫描

nmap可以利用类似windows/linux系统下的ping 方式进行扫描

命令语法：
```
 nmap -sP <target ip>
 ```

例子：
nmap sP 10.1.112.89

---

## 6、nmap 路由跟踪

路由器追踪功能，`能够帮助网络管理员了解网络通行情况，同时也是网络管理人员很好的辅助工具，通过路由器追踪可以轻松的查处从我们电脑所在地到目的地之间所经常的网络节点，并可以看到通过各个结点所花费的时间`

命令语法： 
```
nmap –traceroute <target IP>
```

例子:

namp –traceroute 8.8.8.8(geogle dns服务器ip)

---

## 7、nmap设置扫描一个网段下的ip

命令语法： 
```
nmap -sP <network address> </CIDR>
```

介绍：
CIDR为设置的子网掩码（/24,/16,/8等）

例子：
```
nmap -sP 10.1.1.0 /24
```

---


## 8、nmap 操作系统类型的探测

命令语法： 
```
nmap -0 <target IP>
```

例子：
nmap -O(大写的o) 10.1.112.89

---

## 9、nmap万能开关

包含了`1-10000端口ping扫描`，操作系统扫描，脚本扫描，`路由跟踪，服务探测`

命令语法： 
```
nmap -A <target ip>
```

例子：
```
nmap -A 10.1.112.89
```

---

## 10、nmap命令混合式扫描

可以做到类似参数`-A所完成的功能，但又能细化我们的需求要求`

命令语法： 
```
nmap -vv -p1-100 -O <target ip>
```

例子： 
```
nmap -vv -p1-100 -O 10.1.112.89
```

# 论Nmap中一些常用的NSE脚本

```
nmap IP --script http-enum
```

使用了WordPress。于是，我们可以使用针对WordPress的脚本http-wordpress-enum进行深度扫描。这个脚本还会确定网站使用了多少和WordPress相关的插件。
```
nmap -p80 --sc ript http-wordpress-enum --script-args http-wordpress-enum.search-limit=all ip
```

## 权限

假如我们想在站点上寻找登录授权页面，还可使用如下脚本http-auth-finder。


你也可以使用命令参数—script=auth，所有和授权有关的脚本都将被启用，对目标主机进行探测。而一旦找到和登录授权有关的页面，我们就可以尝试使用类似于http-form-brute的脚本爆破出一些账户密码：
```
nmap -p-80 --script=http-form-brute --script-args=http-form-brute.path=/wp-login.php ip
```

site.test.lan的管理员密码为12345。

对于WordPress来说，Nmap已做的足够出色，它获取了大量和渗透有关的信息，而如果想对WordPress进行更深一步的漏洞探测，你也可以使用已集成在kali linux中的WPScan，这款软件有大量专门针对WordPress的PoC。

##FTP

而通常开放在21端口的FTP服务也往往是爆破对象，我们可以先使用脚本ftp-syst获取一些服务信息:
```
nmap -p21 --script ftp-syst ip
```
之后使暴力破解脚本得到FTP服务的用户密码:
```
nmap -p21 192.168.60.50 --script ftp-brute --script-args userdb=/root/user.txt,passdb=/root/pass.txt
```
## MySQL

Nmap也可对MySQL服务（通常开放在端口3306上）进行扫描爆破，脚本mysql-info将探测出一些MySQ服务的详细信息(需要带上命令参数-sV -sC)：

nmap -p3306 -sV -sC site.test.lan






