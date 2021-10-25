# Linux

如果实在装的头皮发麻 建议安装宝塔cms（也可以更换windows）


```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```


**解决中文乱码问题**
```
在命令行输入

dpkg-reconfigure locales
```
> 进入图形化界面之后，（空格是选择，Tab是切换，*是选中）
```
选中en_US.UTF-8和zh_CN.UTF-8，确定后，将en_US.UTF-8选为默认。


安装中文字体

apt-get install xfonts-intl-chinese
apt-get install ttf-wqy-microhei
重启
```


oracl TNS Listener Remote Poisoning

**linux系统更换时区**

注：# timedatectl # 查看系统时间方面的各种状态

# timedatectl list-timezones # 列出所有时区

（1） timedatectl set-timezone Asia/Shanghai # 设置系统时区为上海

（2） cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime


**时间同步**

ntpdate命令： 
（1） 网络时间同步命令 

```
ntpdate -u ntp.api.bz
```
```
ntp常用服务器： 
中国国家授时中心：210.72.145.44 
NTP服务器(上海) ：ntp.api.bz

美国：time.nist.gov 
复旦：ntp.fudan.edu.cn 
微软公司授时主机(美国) ：time.windows.com 
台警大授时中心(台湾)：asia.pool.ntp.org
```

经测试中国国家授时中心与NTP上海服务器可以正常同步时间，注意需要加上-u参数！

**修改为24小时制**

终端输入命令：tzselect

根据提示选择：
5 --> 9-->1-->1-->ok

然后执行下面这两条命令
rm /etc/localtime
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

date显示时间

3.将系统时间写入硬件时间

 hwclock --systohc

4.强制系统时间写入CMOS中。

hwclock -w 


**安装apache**
```
yum -y install httpd
```
2.开启apache服务
```
systemctl start httpd.service
```
3.设置apache服务开机启动
```
systemctl enable httpd.service
```
4.验证apache服务是否安装成功
在本机浏览器中输入虚拟机的ip地址，CentOS7查看ip地址的方式为：
ip addr
（阿里云不需要用这种方式查看，外网ip已经在你主机列表那里给你写出来了的；）
这里是访问不成功的
（阿里云用外网访问，能成功，不需要做以下步骤）
查了资料，说法是，CentOS7用的是Firewall-cmd，CentOS7之前用的是iptables防火墙；要想让外网能访问到apache主目录，就需要做以下的操作：
```
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --reload
```

**linux 安装php7.2**

1、安装源

安装php72w，是需要配置额外的yum源地址的，否则会报错不能找到相关软件包。

php高版本的yum源地址，有两部分，其中一部分是epel-release，另外一部分来自webtatic。如果跳过epel-release的话，安装webtatic的时候，会有错误爆出。

所以，这里需要的命令是：
```
rpm -Uvh https://dl.Fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm

rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

当然，您也可以选择下面的这个命令，也是一样的效果。
```
yum install epel-release -y

rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

2、清除历史版本

为了防止CentOS上面发生php冲突，所以，这个命令还是先执行一下更好些。
```
yum -y remove php*
```


3、安装扩展包

事实上，这里面的对应扩展库很多，这里大家一定要注意cli和fpm这两个包，而其它的相关包就看您需要了。
```
yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel
```

还有比较豪华的版本：
```
yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-opcache php72w-pdo php72w-xml
```

4、安装完成以后，启动服务
```
systemctl enable php-fpm.service

systemctl start php-fpm.service
```


## 愉快使用网易云音乐

centos环境
```
yum install epel-release
yum install nodejs npm
git clone https://github.com/nondanee/UnblockNeteaseMusic.git
cd UnblockNeteaseMusic
npm install forever -g
npm install
forever start app.js -p 18080   # 启动
firewall-cmd --permanent --zone=public --add-port=18080/tcp
firewall-cmd --reload
forever stop app.js        # 关闭


//启动代码
 cd UnblockNeteaseMusic
        forever start app.js -p 18080
```


## PIP2安装

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
pip2 -v
```




## PIP3安装

```
wget https://bootstrap.pypa.io/get-pip.py 
python3 get-pip.py 
pip3 -V
```


# base
```
rm -f /var/run/yum.pid

yum clean all
yum makecache

rm -f /var/run/yum.pid

yum groupinstall -y "Development Tools"
yum install -y yum-utils
yum install -y vim make gcc gcc-c++ curl git lrzsz wget unzip openssl-devel epel-release
yum update
```



# proxychains
```bash
 git clone https://github.com/haad/proxychains

rz

unzip proxychains-ng.zip
cd proxychains-ng-master
./configure
make && make install
cp ./src/proxychains.conf /etc/proxychains.conf
cd .. && rm -rf proxychains-ng
vim /etc/proxychains.conf
```


## linux安装maven


1、安装wget命令
```bash
yum -y install wget
```
2、下载maven安装包
```
cd /opt
 wget http://mirrors.cnnic.cn/apache/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
```

3.解压maven安装包
```
tar -zxvf apache-maven-3.5.4-bin.tar.gz
```


**ping设置次数**

```
ping www.baidu.com -c1
```

# Alpine镜像使用

alpine镜像在构建镜像过程中作为基础镜像占比越来越高，下面是alpine镜像中包管理工具apk使用相关示例：

1、apk --help命令查看完整的包管理命令。

2、apk update：从远程镜像源中更新本地镜像源索引

3、apk add：安装PACKAGES并自动解决依赖关系，也可以从第三方仓库添加软件包

apk add  nmap vim

apk add --no-cache mysql-client

apk add docker --update-cache --repository http://mirrors.ustc.edu.cn/alpine/v3.4/main/ --allow-untrusted

1
2
3
4
5
6
安装指定版本软件包:

 apk add  nmap=7.70-r3
1
4、apkupgrade 升级软件包

  apk upgrade （升级所有软件报）
 
  apk add --upgrade nmap（指定软件升级）
1
2
3
5、apk del 卸载并删除PACKAGES

 apk del nmap
1
6、apk search 命令搜索可用软件包，-v 参数输出描述内容，支出通配符，-d 或 –description 参数指定通过软件包描述查询。

  apk search #查找所有可用软件包
  
  apk search -v #查找所有可用软件包及其描述内容
  
  apk search -v 'acf*' #通过软件包名称查找软件包
  
  apk search -v -d 'docker' #通过描述文件查找特定的软件包
1
2
3
4
5
6
7
7、apk info：列出PACKAGES或镜像源的详细信息

  apk info #列出所有已安装的软件包
  
  apk info -a zlib #显示完整的软件包信息
  
  apk info --who-owns /sbin/lbu #显示指定文件属于的包
1
2
3
4
5
8、清理akp缓存:rm -rf /var/cache/apk/*

9、apk使用阿里云的源

 sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
1
10、添加用户

addgroup -g 1000 -S demo
adduser demo -D -G demo -u 1000
1
2
11、alpine内编译安装lrzsz

apk update
apk add wget gcc g++ make
wget https://ohse.de/uwe/releases/lrzsz-0.12.20.tar.gz
tar -xf lrzsz-0.12.20.tar.gz
cd lrzsz-0.12.20/
./configure
make; make install
ln -s /usr/local/bin/lrz /usr/local/bin/rz
ln -s /usr/local/bin/lsz /usr/local/bin/sz



- 在 redhat 系同步 EPEL 镜像超时的情况下，可以给epel镜像强制换源

```bash
sed -e 's!^metalink=!#metalink=!g' \
    -e 's!^#baseurl=!baseurl=!g' \
    -e 's!//download\.fedoraproject\.org/pub!//mirrors.tuna.tsinghua.edu.cn!g' \
    -e 's!http://mirrors\.tuna!https://mirrors.tuna!g' \
    -i /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo
```

