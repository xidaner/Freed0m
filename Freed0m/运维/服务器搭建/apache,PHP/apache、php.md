# apache、php、mysql 服务安装

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

**安装MYSQL**


1. 检查是否已经安装过mysql，执行命令

```
[root@localhost /]# rpm -qa | grep mysql
```

如果需要安装最新版、记得备份！

2. yum安装：

```
yum install mysql-server
```

启动MYSQl：
```
systemctl start mysqld   #启动MySQL
```

3. 获取安装时的临时密码（在第一次登录时就是用这个密码）：
```
grep 'temporary password' /var/log/mysqld.log
```



























